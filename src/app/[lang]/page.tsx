import { notFound } from "next/navigation";
import { HomePage } from "../../components/HomePage";

const LANGS = ["de", "en", "es"];

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

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
