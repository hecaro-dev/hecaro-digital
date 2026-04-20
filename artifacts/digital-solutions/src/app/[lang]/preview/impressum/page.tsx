import { notFound } from "next/navigation";
import LegalPage from "../../../../components/LegalPage";

const LANGS = ["de", "en", "es"];

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!LANGS.includes(lang)) {
    notFound();
  }

  return <LegalPage lang={lang} kind="imprint" />;
}
