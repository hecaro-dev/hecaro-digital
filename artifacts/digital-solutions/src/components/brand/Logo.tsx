"use client";

/**
 * Digital Solutions – Brand System
 *
 * LogoMark   → standalone SVG symbol (scalable, theme-aware)
 * Logo       → horizontal lockup: symbol + wordmark
 *
 * The "Meridian" mark:
 *   - A precision orbit ring   → global reach
 *   - A thin equator line      → geographic reference / systems thinking
 *   - A bright apex node       → the precise point / the client's goal
 */

interface LogoMarkProps {
  size?: number;
  theme?: "dark" | "light";
  className?: string;
}

export function LogoMark({ size = 28, theme = "dark", className }: LogoMarkProps) {
  const emerald = "#10b981";
  const ink = theme === "dark" ? emerald : "#0d9669";
  const inkFaint = theme === "dark" ? "rgba(16,185,129,0.42)" : "rgba(13,150,105,0.35)";

  const cx = 12;
  const cy = 12;
  const r = 8.5;

  const apexY = cy - r;
  const equatorX1 = cx - r;
  const equatorX2 = cx + r;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={ink}
        strokeWidth="1.6"
        strokeOpacity="0.85"
      />

      <line
        x1={equatorX1}
        y1={cy}
        x2={equatorX2}
        y2={cy}
        stroke={inkFaint}
        strokeWidth="1"
        strokeLinecap="round"
      />

      <circle
        cx={cx}
        cy={apexY}
        r="2.2"
        fill={ink}
      />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  theme?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 28, theme = "dark", showWordmark = true, className }: LogoProps) {
  const isDark = theme === "dark";

  const primaryText = isDark ? "#ffffff" : "#020617";
  const secondaryText = isDark ? "rgba(255,255,255,0.55)" : "rgba(2,6,23,0.5)";

  const digitalSize = Math.round(size * 0.54);
  const solutionsSize = Math.round(size * 0.38);

  return (
    <div
      className={`flex items-center select-none ${className ?? ""}`}
      style={{ gap: Math.round(size * 0.36) }}
    >
      <LogoMark size={size} theme={theme} />

      {showWordmark && (
        <div className="flex flex-col" style={{ lineHeight: 1.15 }}>
          <span
            style={{
              fontSize: digitalSize,
              fontWeight: 700,
              color: primaryText,
              letterSpacing: "0.03em",
              fontFamily: "inherit",
            }}
          >
            Digital
          </span>
          <span
            style={{
              fontSize: solutionsSize,
              fontWeight: 300,
              color: secondaryText,
              letterSpacing: "0.11em",
              textTransform: "uppercase",
              fontFamily: "inherit",
            }}
          >
            Solutions
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoFavicon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill="#020617" />
      <circle cx="16" cy="16" r="10.5" stroke="#10b981" strokeWidth="1.75" strokeOpacity="0.85" />
      <line x1="5.5" y1="16" x2="26.5" y2="16" stroke="#10b981" strokeWidth="1.1" strokeOpacity="0.42" strokeLinecap="round" />
      <circle cx="16" cy="5.5" r="2.6" fill="#10b981" />
    </svg>
  );
}
