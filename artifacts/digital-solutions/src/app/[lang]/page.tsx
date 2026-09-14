import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "../../components/HomePage";

const LANGS = ["de", "en", "es"];

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "HECARO Digital — Websites & digitale Lösungen",
  description: "Professionelle Websites und digitale Lösungen für Unternehmen — persönlich betreut auf Deutsch, Englisch und Spanisch.",
  robots: { index: true, follow: true },
};

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!LANGS.includes(lang)) {
    notFound();
  }

  return <HomePage lang={lang} />;
}
