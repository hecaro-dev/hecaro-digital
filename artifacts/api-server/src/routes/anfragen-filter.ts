import { Router } from "express";
import OpenAI from "openai";

const router = Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a lead qualification expert for a premium digital automation agency.
The score has already been calculated from stable answer identifiers. Do not change or reinterpret it.

Write a concise assessment in the requested language:
- summary: 2-3 sentences explaining the automation potential based only on the supplied answers
- nextStep: one personalized sentence stating the most useful practical next step

Score meaning:
- 60-100: high automation potential
- 45-59: moderate automation potential
- 0-44: low current automation potential

Respond only with valid JSON:
{
  "summary": "string",
  "nextStep": "string"
}`;

function calculateScore(answerIndexes: number[], problem: string): number {
  const enquiryVolume = [0, 10, 15, 20][answerIndexes[1]] ?? 0;
  const currentProcess = [15, 10, 5, 15][answerIndexes[3]] ?? 0;
  const problemSpecificity =
    problem.trim().length >= 80 ? 20 : problem.trim().length >= 35 ? 15 : 5;

  return Math.min(100, 5 + enquiryVolume + 10 + currentProcess + problemSpecificity);
}

router.post("/anfragen-filter", async (req, res) => {
  try {
    const { answers, answerIndexes, lang } = req.body;

    if (
      !Array.isArray(answers) ||
      answers.length !== 5 ||
      answers.some((answer) => typeof answer !== "string" || !answer.trim()) ||
      !Array.isArray(answerIndexes) ||
      answerIndexes.length !== 5
    ) {
      res.status(400).json({ error: "Invalid answers" });
      return;
    }

    const score = calculateScore(answerIndexes, answers[4]);
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Answers:\n${answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n")}
Calculated score: ${score}/100
Language: ${lang === "en" ? "English" : lang === "es" ? "Spanish" : "German"}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 400,
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    const result = JSON.parse(raw);

    if (typeof result.summary !== "string" || typeof result.nextStep !== "string") {
      throw new Error("Invalid AI response");
    }

    res.json({ score, summary: result.summary, nextStep: result.nextStep });
  } catch (error) {
    console.error("Anfragen filter route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;