/* =============================================
   Language Switcher Component
   Change texts in: src/i18n/de.ts, en.ts, es.ts
   ============================================= */
import { useI18n, Lang } from "../i18n";

const LANGS: { code: Lang; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5" role="navigation" aria-label="Language selection">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={`Switch language to ${label}`}
          aria-pressed={lang === code}
          className={`
            px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200
            ${lang === code
              ? "bg-indigo-500/20 text-indigo-300 shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-white/5"}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
