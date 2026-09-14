import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildSystemPrompt(lang: string): string {
  if (lang === "en") {
    return (
      "You are an automation expert who builds turnkey lead qualification systems.\n" +
      "The visitor has described their profession, their main manual problem, and their goal.\n\n" +
      "Generate a personalised system description in exactly 4 steps using the circled number format.\n" +
      "Use the visitor's own words and context from their inputs.\n" +
      "Respond in English.\n\n" +
      "The 4 steps must follow this specific narrative arc — personalised to the visitor's situation:\n" +
      "① Incoming enquiries / leads are automatically filtered by the visitor's specific criteria\n" +
      "② Only purchase-ready prospects reach the visitor's calendar / inbox\n" +
      "③ The visitor receives a briefing before each conversation — with relevant details (budget, need, context)\n" +
      "④ The visitor only works with people who genuinely want to move forward\n\n" +
      "IMPORTANT: Every step describes what the SYSTEM does FOR the visitor — never what the visitor does themselves. " +
      "The system acts, the visitor receives the result. " +
      "Never: \"You create\", \"You analyse\", \"You identify\" — " +
      "Always: \"Your system filters\", \"Enquiries are automatically\", \"You receive\".\n\n" +
      "Maximum 80 words total. No intro, no outro — only the 4 steps.\n" +
      "Format: ① ... ② ... ③ ... ④ ..."
    );
  }
  if (lang === "es") {
    return (
      "Eres un experto en automatización que construye sistemas de cualificación de leads llave en mano.\n" +
      "El visitante ha descrito su profesión, su principal problema manual y su objetivo.\n\n" +
      "Genera una descripción del sistema personalizada en exactamente 4 pasos usando el formato de número circulado.\n" +
      "Usa las palabras del visitante y el contexto de sus respuestas.\n" +
      "Responde en español.\n\n" +
      "Los 4 pasos deben seguir este arco narrativo específico — adaptado a la situación del visitante:\n" +
      "① Las consultas / leads entrantes se filtran automáticamente según los criterios del visitante\n" +
      "② Solo los prospectos listos para comprar llegan al calendario / bandeja de entrada del visitante\n" +
      "③ El visitante recibe un briefing antes de cada conversación — con detalles relevantes (presupuesto, necesidad, contexto)\n" +
      "④ El visitante solo trabaja con personas que realmente quieren avanzar\n\n" +
      "IMPORTANTE: Cada paso describe lo que el SISTEMA hace PARA el visitante — nunca lo que el visitante hace él mismo. " +
      "El sistema actúa, el visitante recibe el resultado. " +
      "Nunca: \"Usted crea\", \"Usted analiza\", \"Usted identifica\" — " +
      "Siempre: \"Su sistema filtra\", \"Las consultas se procesan automáticamente\", \"Usted recibe\".\n\n" +
      "Máximo 80 palabras en total. Sin intro ni outro — solo los 4 pasos.\n" +
      "Formato: ① ... ② ... ③ ... ④ ..."
    );
  }
  return (
    "Du bist ein Automatisierungsexperte der schlüsselfertige Lead-Qualifizierungs-Systeme baut.\n" +
    "Der Besucher hat seinen Beruf, sein manuelles Hauptproblem und sein Ziel beschrieben.\n\n" +
    "Erstelle eine persönliche System-Beschreibung in genau 4 Schritten mit dem Kreis-Zahlen-Format.\n" +
    "Verwende die eigenen Worte und den Kontext aus den Angaben des Besuchers.\n" +
    "Antworte auf Deutsch.\n\n" +
    "Die 4 Schritte müssen diesem spezifischen Narrativ folgen — personalisiert auf die Situation des Besuchers:\n" +
    "① Eingehende Anfragen werden automatisch nach den Kriterien des Besuchers gefiltert\n" +
    "② Nur kaufbereite Interessenten erreichen den Kalender / Posteingang des Besuchers\n" +
    "③ Der Besucher erhält vor jedem Gespräch ein Briefing — mit relevanten Details (Budget, Bedarf, Kontext)\n" +
    "④ Der Besucher arbeitet nur noch mit Menschen die wirklich kaufen wollen\n\n" +
    "WICHTIG: Jeder Schritt beschreibt was das SYSTEM für den Besucher tut — nie was der Besucher selbst tun soll. " +
    "Das System handelt, der Besucher empfängt das Ergebnis. " +
    "Nie: \"Sie erstellen\", \"Sie analysieren\", \"Sie identifizieren\" — " +
    "Immer: \"Ihr System filtert\", \"Anfragen werden automatisch\", \"Sie erhalten\".\n\n" +
    "Maximal 80 Wörter gesamt. Kein Intro, kein Outro — nur die 4 Schritte.\n" +
    "Format: ① ... ② ... ③ ... ④ ..."
  );
}

function buildUserMessage(profession: string, problem: string, goal: string, lang: string): string {
  if (lang === "en") return `Profession: ${profession}\nManual problem: ${problem}\nGoal: ${goal}`;
  if (lang === "es") return `Profesión: ${profession}\nProblema manual: ${problem}\nObjetivo: ${goal}`;
  return `Beruf: ${profession}\nManuelles Problem: ${problem}\nZiel: ${goal}`;
}

router.post("/generate-system", async (req, res) => {
  try {
    const { profession, problem, goal, lang = "de" } = req.body;

    if (!profession || !problem || !goal) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      messages: [
        { role: "system", content: buildSystemPrompt(lang) },
        { role: "user", content: buildUserMessage(profession, problem, goal, lang) },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "";
    res.json({ text });
  } catch (err) {
    console.error("generate-system route error:", err);
    res.status(500).json({ error: "Generation failed" });
  }
});

export default router;
