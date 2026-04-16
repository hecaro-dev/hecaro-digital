import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a lead qualification expert for a premium web design & SEO agency.
Based on the prospect's name, bottleneck, impact level and budget, classify them as grade A or B.

Grade A = High-value lead ready for immediate consultation:
- Budget >= 1500 € AND
- Impact is "very high" or "high" AND
- Bottleneck is specific (not generic)

Grade B = Needs nurturing first:
- Low budget (< 500 €) OR vague bottleneck OR low impact

Respond ONLY with valid JSON in this exact shape:
{
  "grade": "A" or "B",
  "summary": "2-3 sentence summary of the lead situation in the same language as the input",
  "recommendation": "1-2 sentence actionable recommendation in the same language as the input"
}`;

router.post("/qualify", async (req, res) => {
  try {
    const { name, bottleneck, impact, budget, lang } = req.body;

    if (!name || !bottleneck || !impact || !budget) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    const userMessage = `Name: ${name}
Bottleneck / Engpass: ${bottleneck}
Impact: ${impact}
Budget: ${budget}
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

    res.json(result);
  } catch (err) {
    console.error("Qualify route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
