import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { calculateLeadScore, determineLeadGrade } from "@workspace/lead-scoring";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a lead qualification expert for a digital automation agency.
The lead score and grade have already been calculated deterministically. Do not change them.

A strong profile receives many weekly enquiries and loses substantial time to unqualified initial calls. A medium profile has moderate enquiry volume or a less urgent time problem. A weak profile receives few enquiries and mainly reports a low-urgency response-time problem.

Grade A / green (60-100) = strong, concrete need and high implementation potential.
Grade B / yellow (35-59) = recognisable need, but urgency or implementation potential is moderate.
Grade C / red (0-34) = weak or vague need with low current urgency and limited implementation potential.

Respond ONLY with valid JSON in this exact shape:
{
  "summary": "2-3 sentence summary of the lead situation in the same language as the input",
  "recommendation": "1-2 sentence actionable recommendation in the same language as the input"
}`;

export async function POST(req: NextRequest) {
  try {
    const { businessType, enquiryVolume, timeCost, lang } = await req.json();

    if (!businessType || !enquiryVolume || !timeCost || !["de", "en", "es"].includes(lang)) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const score = calculateLeadScore(businessType, enquiryVolume, timeCost);
    const grade = determineLeadGrade(score);

    const userMessage = `Business type: ${businessType}
Weekly enquiry volume: ${enquiryVolume}
Main time cost: ${timeCost}
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

    return NextResponse.json({ ...result, score, grade });
  } catch (err) {
    console.error("Qualify API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
