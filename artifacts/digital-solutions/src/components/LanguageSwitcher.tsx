/* =============================================
   Language Switcher Component
   Change texts in: src/i18n/de.ts, en.ts, es.ts
   ============================================= */
import { useI18n, Lang } from "../i18n";
import { Globe } from "lucide-react";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "de", label: "DE", flag: "🇩🇪" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1" role="navigation" aria-label="Language selection">
      <Globe className="w-4 h-4 text-slate-400" aria-hidden="true" />
      {LANGS.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={`Switch language to ${label}`}
          aria-pressed={lang === code}
          className={`
            px-2 py-1 text-xs font-semibold rounded transition-all duration-200
            ${lang === code
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-700"}
          `}
        >
          <span className="mr-0.5">{flag}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
