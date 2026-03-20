import type { Metadata } from "next";
import { de } from "../../i18n/de";
import { en } from "../../i18n/en";
import { es } from "../../i18n/es";
import type { Translations } from "../../i18n/de";

type Lang = "de" | "en" | "es";
const LANGS: Lang[] = ["de", "en", "es"];
const translations: Record<Lang, Translations> = { de, en, es };
const BASE_URL = "https://global-biz-hub.replit.app";

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const safeLang: Lang = LANGS.includes(lang as Lang) ? (lang as Lang) : "de";
  const t = translations[safeLang];

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `${BASE_URL}/${safeLang}`,
      languages: {
        de: `${BASE_URL}/de`,
        en: `${BASE_URL}/en`,
        es: `${BASE_URL}/es`,
        "x-default": `${BASE_URL}/de`,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${BASE_URL}/${safeLang}`,
      siteName: "Digital Solutions",
      locale: safeLang,
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang: Lang = LANGS.includes(lang as Lang) ? (lang as Lang) : "de";
  const t = translations[safeLang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Digital Solutions",
    description: t.meta.description,
    url: `${BASE_URL}/${safeLang}`,
    areaServed: ["DE", "ES", "GB", "US"],
    availableLanguage: ["German", "English", "Spanish"],
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
