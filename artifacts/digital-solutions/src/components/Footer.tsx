"use client";

import { useI18n } from "../i18n";

interface FooterProps {
  onLegal: (type: "imprint" | "privacy") => void;
  onNav?: (section: string) => void;
}

export default function Footer({ onLegal, onNav = () => {} }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer className="bg-black pt-20 pb-10 px-4 border-t border-white/[0.06]" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-4 lg:col-span-5">
            <div className="mb-5">
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "0.08em",
                  display: "block",
                }}
              >
                HECARO Digital
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.38)",
                  letterSpacing: "0.09em",
                  display: "block",
                  marginTop: 4,
                }}
              >
                International Web Design &amp; SEO
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">{t.footer.tagline}</p>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6">{t.footer.navTitle}</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={() => onNav("services")} className="hover:text-white transition-colors">{t.footer.links.services}</button></li>
              <li><button onClick={() => onNav("portfolio")} className="hover:text-white transition-colors">{t.footer.links.portfolio}</button></li>
              <li><button onClick={() => onNav("contact")} className="hover:text-white transition-colors">{t.footer.links.contact}</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-white font-semibold mb-6">Legal & FAQ</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={() => onNav("faq")} className="hover:text-white transition-colors">{t.footer.links.faq}</button></li>
              <li><button onClick={() => onLegal("imprint")} className="hover:text-white transition-colors">{t.footer.links.imprint}</button></li>
              <li><button onClick={() => onLegal("privacy")} className="hover:text-white transition-colors">{t.footer.links.privacy}</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} HECARO Digital. {t.footer.rights}
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
