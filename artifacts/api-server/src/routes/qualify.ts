import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a lead qualification expert for a digital automation agency.
The lead score and grade have already been calculated deterministically. Do not change them.

A good lead has a specific operational bottleneck, loses time to unproductive conversations frequently, and has enough organisational capacity to implement an automation system.

Grade A / green (60-100) = strong, concrete need and high implementation potential.
Grade B / yellow (45-59) = recognisable need, but urgency or implementation potential is moderate.
Grade C / red (0-44) = weak or vague need with low current urgency and limited implementation potential.

Respond ONLY with valid JSON in this exact shape:
{
  "summary": "2-3 sentence summary of the lead situation in the same language as the input",
  "recommendation": "1-2 sentence actionable recommendation in the same language as the input"
}`;

function calculateScore(
  bottleneck: string,
  impact: string,
  companySize: string,
): number {
  const normalizedImpact = impact.toLowerCase();
  const normalizedCompanySize = companySize.toLowerCase();

  const bottleneckScore =
    bottleneck.trim().length >= 60 ? 20 : bottleneck.trim().length >= 25 ? 15 : 5;

  const impactScore =
    normalizedImpact.includes("täglich") ||
    normalizedImpact.includes("daily") ||
    normalizedImpact.includes("a diario")
      ? 45
      : normalizedImpact.includes("mehrmals") ||
          normalizedImpact.includes("several") ||
          normalizedImpact.includes("varias")
        ? 30
        : 15;

  const companyScore = normalizedCompanySize.includes("10+")
    ? 35
    : normalizedCompanySize.includes("2–10") ||
        normalizedCompanySize.includes("2-10")
      ? 25
      : 10;

  return bottleneckScore + impactScore + companyScore;
}

router.post("/qualify", async (req, res) => {
  try {
    const { bottleneck, impact, budget, lang } = req.body;

    if (!bottleneck || !impact || !budget) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    const score = calculateScore(bottleneck, impact, budget);
    const grade = score >= 60 ? "A" : score >= 45 ? "B" : "C";

    const userMessage = `Bottleneck / Engpass: ${bottleneck}
Impact: ${impact}
Company size: ${budget}
Calculated score: ${score}/100
Fixed grade: ${grade}
Language of response: ${lang === "en" ? "English" : lang === "es" ? "Spanish" : "German"}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 400,
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    const result = JSON.parse(raw);

    res.json({ ...result, score, grade });
  } catch (err) {
    console.error("Qualify route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
