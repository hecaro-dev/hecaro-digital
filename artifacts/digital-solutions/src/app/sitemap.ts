import type { MetadataRoute } from "next";

const BASE_URL = "https://global-biz-hub.replit.app";
const LANGS = ["de", "en", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "de" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        LANGS.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
  }));
}
