"use client";

import { useI18n } from "../i18n";

export default function MarqueeSection() {
  const { t } = useI18n();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="w-full bg-black py-4 border-y border-white/[0.06] overflow-hidden flex items-center">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>
      <div className="animate-marquee">
        {items.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="mx-6 text-xs font-semibold tracking-widest uppercase text-slate-500">
              {item}
            </span>
            <span className="text-slate-700 text-xs">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
