"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";

import { business, fullAddress, hours, messages, wa } from "@/lib/site";
import { PlusIcon } from "./ui/Icons";
import { SectionTitle } from "./ui/SectionTitle";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "How do I get a quote?",
    a: (
      <>
        Message us on{" "}
        <a href={wa(messages.quote)} target="_blank" rel="noopener noreferrer" className="font-semibold text-bone underline decoration-blood decoration-2 underline-offset-4 hover:text-blood">
          WhatsApp
        </a>{" "}
        with your idea, a few reference images, the size and the body area. We quote you right in the chat.
      </>
    ),
  },
  {
    q: "How much does a tattoo cost?",
    a: "[PLACEHOLDER: pricing approach, e.g. minimum price / hourly rate / per piece]",
  },
  {
    q: "What styles do you do?",
    a: "[PLACEHOLDER: styles]",
  },
  {
    q: "Do I need to leave a deposit?",
    a: "[PLACEHOLDER: deposit policy]",
  },
  {
    q: "Do you take walk-ins?",
    a: "[PLACEHOLDER: walk-in policy]",
  },
  {
    q: "Where are you and what are your hours?",
    a: (
      <>
        We’re at {fullAddress} (plus code {business.plusCode}). Open {hours.days}, {hours.opens} to {hours.closes}.{" "}
        <a href="#location" className="font-semibold text-bone underline decoration-blood decoration-2 underline-offset-4 hover:text-blood">
          See the map
        </a>
        .
      </>
    ),
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionTitle id="faq-title" accent="answered.">
              Questions, answered.
            </SectionTitle>
            <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-smoke">
              Still unsure?{" "}
              <a href={wa(messages.faq)} target="_blank" rel="noopener noreferrer" className="font-semibold text-bone underline decoration-blood decoration-2 underline-offset-4 hover:text-blood">
                Ask us directly
              </a>
              .
            </p>
          </div>
        </div>

        <ul className="border-t-2 border-bone lg:col-span-7">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            const panelId = `${baseId}-panel-${idx}`;
            const btnId = `${baseId}-btn-${idx}`;
            return (
              <li key={f.q} className="border-b-2 border-line">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`text-xl font-bold leading-snug transition-colors sm:text-2xl ${isOpen ? "text-blood" : "group-hover:text-blood"}`}>
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 shrink-0 items-center justify-center border-2 transition-colors ${isOpen ? "border-blood bg-blood text-ink" : "border-bone/60 text-bone"}`}
                    >
                      <motion.span
                        className="flex"
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ type: "spring", stiffness: 420, damping: 20 }}
                      >
                        <PlusIcon size={20} />
                      </motion.span>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { type: "spring", stiffness: 320, damping: 34 }, opacity: { duration: 0.2 } }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        className="max-w-[60ch] pb-7 pr-14 text-lg leading-relaxed text-smoke"
                      >
                        {f.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
