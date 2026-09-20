import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "./FadeInAnimation";

const FAQ = [
  { question: "Moet ik investeren?", answer: "Nee, alles gebeurt automatisch." },
  { question: "Kan ik zelf investeringen kiezen?", answer: "Nee, de IQ Bot doet dit volgens plan." },
  { question: "Hoe zie ik mijn cashflow groeien?", answer: "Via je persoonlijke Member Dashboard." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto w-full max-w-content px-6 pb-28 pt-4 md:pb-36 lg:px-10" id="faq">
      <div className="grid gap-10 lg:grid-cols-12">
        <FadeIn delay={0.05} className="lg:col-span-4">
          <div className="eyebrow eyebrow--paper mb-6">Vragen</div>
          <h3 className="font-display text-display-md font-semibold tracking-[-0.03em] text-graphite">FAQ</h3>
        </FadeIn>
        <div className="lg:col-span-8">
          <div className="card-paper divide-y divide-paper-hairline overflow-hidden">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <FadeIn key={f.question} delay={0.1 + 0.05 * i}>
                  <button
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-paper"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-medium tracking-[-0.01em] text-graphite">{f.question}</span>
                    <span
                      className={`icon-tile icon-tile--paper h-9 w-9 shrink-0 rounded-full transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-base leading-7 text-graphite-muted">{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
