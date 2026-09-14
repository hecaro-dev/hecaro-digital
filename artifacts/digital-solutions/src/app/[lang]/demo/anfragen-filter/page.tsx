import { notFound } from "next/navigation";
import DemoAnfragenFilterPage from "../../../../components/DemoAnfragenFilterPage";

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

  return <DemoAnfragenFilterPage lang={lang} />;
}