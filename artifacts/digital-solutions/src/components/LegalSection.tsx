/* =============================================
   Legal Pages (Impressum / Datenschutz)
   Change content in: src/i18n/de.ts (legal key)
   ============================================= */
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useI18n } from "../i18n";

interface LegalModalProps {
  type: "imprint" | "privacy" | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  const { t } = useI18n();

  const title =
    type === "imprint" ? t.legal.imprintTitle : t.legal.privacyTitle;
  const text =
    type === "imprint" ? t.legal.imprintText : t.legal.privacyText;

  return (
    <AnimatePresence>
      {type && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.dialog
            key="modal"
            open
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] bg-slate-900 border border-slate-700 rounded-2xl p-8 overflow-y-auto shadow-2xl"
            aria-labelledby="legal-modal-title"
            aria-modal="true"
          >
            <div className="flex items-start justify-between mb-6">
              <h2
                id="legal-modal-title"
                className="text-2xl font-bold text-white"
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Content – pre-wrap preserves newlines */}
            <div className="prose prose-invert prose-sm max-w-none">
              {text.split("\n").map((line, i) =>
                line === "" ? (
                  <br key={i} />
                ) : (
                  <p key={i} className="text-slate-400 text-sm leading-relaxed mb-1">
                    {line}
                  </p>
                )
              )}
            </div>

            <p className="mt-8 text-xs text-slate-600">
              * Platzhalter – bitte vor Veröffentlichung mit echten Daten befüllen.
            </p>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
}
