"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { I18nProvider, type Lang } from "../i18n";
import { useI18n } from "../i18n";

type LegalKind = "imprint" | "privacy";

function LegalPageInner({ kind }: { kind: LegalKind }) {
  const { t, lang } = useI18n();

  const title =
    kind === "imprint" ? t.footer.links.imprint : t.footer.links.privacy;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #020617 0%, #050f1e 60%, #020617 100%)",
      }}
    >
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-4xl mx-auto w-full">
        <Link
          href={`/${lang}/preview`}
          className="flex items-center gap-2.5 text-white hover:text-emerald-400 transition-colors"
        >
          <img
            src="/hecaro-h-logo.png"
            alt="HECARO Digital"
            style={{
              height: 32,
              width: "auto",
              filter: "invert(1) brightness(1.5)",
              mixBlendMode: "screen" as const,
            }}
          />
          <span className="font-bold text-base tracking-wide">
            HECARO Digital
          </span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-start px-6 py-12">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-tight">
            {title}
          </h1>

          <section className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10">
            <p className="text-slate-300 text-sm uppercase tracking-widest font-semibold">
              RECHTLICHER TEXT IN BEARBEITUNG
            </p>
          </section>

          <div className="mt-10">
            <Link
              href={`/${lang}/preview`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-white/30 text-slate-300 hover:text-white text-sm font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "de"
                ? "Zurück zur Startseite"
                : lang === "es"
                ? "Volver al inicio"
                : "Back to home"}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="px-6 py-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-slate-500 text-xs">
          © {new Date().getFullYear()} HECARO Digital
        </div>
      </footer>
    </div>
  );
}

export default function LegalPage({
  lang,
  kind,
}: {
  lang: string;
  kind: LegalKind;
}) {
  const safeLang = (["de", "en", "es"].includes(lang) ? lang : "de") as Lang;
  return (
    <I18nProvider lang={safeLang}>
      <LegalPageInner kind={kind} />
    </I18nProvider>
  );
}
