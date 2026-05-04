"use client";

import Link from "next/link";
import { useI18n } from "../i18n";

export default function DemoResultBlock() {
  const { t, lang } = useI18n();

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 flex flex-col items-center gap-5 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/15" />
          <span className="w-6 h-6 rounded-full bg-yellow-400 border border-yellow-300/50 shadow-[0_0_12px_rgba(250,204,21,0.6)]" />
          <span className="w-6 h-6 rounded-full bg-emerald-400 border border-emerald-300/50 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
        </div>
        <span className="text-sm font-semibold text-slate-200">{t.demoResult.rating}</span>
      </div>
      <Link
        href={`/${lang}/preview#contact`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-widest uppercase transition-colors duration-200"
      >
        {t.demoResult.cta}
      </Link>
    </div>
  );
}
