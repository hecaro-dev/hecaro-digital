/* =============================================
   Footer Component
   Change content in: src/i18n/de.ts (footer/nav keys)
   ============================================= */
import { useI18n } from "../i18n";

interface FooterProps {
  onLegal: (type: "imprint" | "privacy") => void;
}

export default function Footer({ onLegal }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer
      className="border-t border-white/5 py-10 px-4"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">DS</span>
          </div>
          <span className="font-semibold text-white text-sm">Digital Solutions</span>
        </div>

        {/* Copy */}
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Digital Solutions. {t.footer.rights}
        </p>

        {/* Legal links */}
        <nav className="flex items-center gap-4" aria-label="Legal navigation">
          <button
            onClick={() => onLegal("imprint")}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            {t.nav.imprint}
          </button>
          <button
            onClick={() => onLegal("privacy")}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            {t.nav.privacy}
          </button>
        </nav>
      </div>
    </footer>
  );
}
