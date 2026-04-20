import type { Metadata } from "next";
import { notFound } from "next/navigation";

const LANGS = ["de", "en", "es"];

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "HECARO Digital — Under Construction",
  description: "Wir überarbeiten aktuell unser Branding und unser Angebot.",
  robots: { index: false, follow: false },
};

export default async function MaintenancePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!LANGS.includes(lang)) {
    notFound();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(135deg, #020617 0%, #050f1e 60%, #020617 100%)",
      }}
    >
      <main className="text-center max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-6">
          Under Construction
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
          HECARO Digital
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Wir überarbeiten aktuell unser Branding und unser Angebot.
          <br />
          Bald sind wir mit neuen KI-Lösungen zurück.
        </p>
        <div className="mt-10 flex justify-center">
          <span className="inline-flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Coming soon
          </span>
        </div>
      </main>
    </div>
  );
}
