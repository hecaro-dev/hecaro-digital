import { createHmac } from "node:crypto";
import { pool } from "./index";

const IP_WINDOW_MS = 15 * 60 * 1000;
const MAX_SENDS_PER_IP = 3;
const RECIPIENT_WINDOW_MS = 60 * 1000;

type Limit = {
  key: string;
  maxAttempts: number;
  windowMs: number;
};

type StoredLimit = {
  attempts: number;
  window_started_at: Date;
};

function keyFor(scope: "ip" | "recipient", value: string) {
  const secret =
    process.env.DEMO_EMAIL_RATE_LIMIT_SECRET ?? process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("Demo email rate limit secret is not configured");
  }
  const digest = createHmac("sha256", secret).update(value).digest("hex");
  return `demo-email:${scope}:${digest}`;
}

export async function consumeDemoEmailLimits(ip: string, recipient: string) {
  const limits: Limit[] = [
    { key: keyFor("ip", ip), maxAttempts: MAX_SENDS_PER_IP, windowMs: IP_WINDOW_MS },
    { key: keyFor("recipient", recipient), maxAttempts: 1, windowMs: RECIPIENT_WINDOW_MS },
  ].sort((a, b) => a.key.localeCompare(b.key));
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM demo_email_rate_limits WHERE expires_at < NOW()");

    for (const limit of limits) {
      await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [limit.key]);
    }

    const now = new Date();
    for (const limit of limits) {
      const result = await client.query<StoredLimit>(
        `SELECT attempts, window_started_at
         FROM demo_email_rate_limits
         WHERE key = $1
         FOR UPDATE`,
        [limit.key],
      );
      const current = result.rows[0];
      const windowExpired =
        !current || now.getTime() - current.window_started_at.getTime() >= limit.windowMs;

      if (!windowExpired && current.attempts >= limit.maxAttempts) {
        await client.query("ROLLBACK");
        return { allowed: false as const };
      }
    }

    for (const limit of limits) {
      await client.query(
        `INSERT INTO demo_email_rate_limits (key, attempts, window_started_at, expires_at)
         VALUES ($1, 1, $2, $3)
         ON CONFLICT (key) DO UPDATE SET
           attempts = CASE
             WHEN demo_email_rate_limits.window_started_at <= $2::timestamptz - ($4 * interval '1 millisecond')
               THEN 1
             ELSE demo_email_rate_limits.attempts + 1
           END,
           window_started_at = CASE
             WHEN demo_email_rate_limits.window_started_at <= $2::timestamptz - ($4 * interval '1 millisecond')
               THEN $2
             ELSE demo_email_rate_limits.window_started_at
           END,
           expires_at = CASE
             WHEN demo_email_rate_limits.window_started_at <= $2::timestamptz - ($4 * interval '1 millisecond')
               THEN $3
             ELSE demo_email_rate_limits.expires_at
           END`,
        [limit.key, now, new Date(now.getTime() + limit.windowMs), limit.windowMs],
      );
    }

    await client.query("COMMIT");
    return { allowed: true as const };
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}