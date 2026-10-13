"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { messages, wa } from "@/lib/site";
import { WhatsAppIcon } from "./ui/Icons";
import { SectionTitle } from "./ui/SectionTitle";

const steps = [
  {
    title: "Send your idea",
    body: "Message us on WhatsApp with your references, the size you have in mind and where it goes on your body.",
    link: { href: wa(messages.idea), label: "Send it now" },
  },
  { title: "Get your design", body: "[PLACEHOLDER: design/approval process]" },
  { title: "Book your session", body: "[PLACEHOLDER: deposit policy]" },
  { title: "Tattoo day + aftercare", body: "[PLACEHOLDER: aftercare info]" },
];

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const pathLength = useTransform(drawn, (v) => (reduce ? 1 : v));

  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-line px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionTitle id="process-title" accent="four">
              Idea to ink in four moves.
            </SectionTitle>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          {/* Track + scroll-drawn line, centered on the number stamps. */}
          <div aria-hidden="true" className="absolute bottom-8 left-[1.75rem] top-8 w-2 -translate-x-1/2 sm:left-[2.25rem]">
          <svg className="block h-full w-full overflow-visible" viewBox="0 0 8 100" preserveAspectRatio="none">
            <line x1="4" y1="0" x2="4" y2="100" stroke="var(--color-line)" strokeWidth="8" />
            <motion.line
              x1="4"
              y1="0"
              x2="4"
              y2="100"
              stroke="var(--color-blood)"
              strokeWidth="8"
              style={{ pathLength }}
            />
          </svg>
          </div>

          {steps.map((s, idx) => (
            <motion.li
              key={s.title}
              className="relative grid grid-cols-[3.5rem_1fr] gap-6 pb-16 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-10"
              initial={reduce ? false : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.5, margin: "0px 0px -20% 0px" }}
            >
              <motion.span
                aria-hidden="true"
                className="display relative z-10 flex h-14 w-14 items-center justify-center border-[3px] border-blood bg-ink text-4xl text-blood sm:h-[4.5rem] sm:w-[4.5rem] sm:text-5xl"
                variants={{
                  hidden: { scale: 1.9, rotate: -14, opacity: 0 },
                  shown: { scale: 1, rotate: idx % 2 ? 3 : -3, opacity: 1, transition: { type: "spring", stiffness: 600, damping: 17 } },
                }}
              >
                {idx + 1}
              </motion.span>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  shown: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 26, delay: 0.08 } },
                }}
                className="pt-1"
              >
                <h3 className="display text-[clamp(2.25rem,5vw,3.75rem)]">
                  <span className="sr-only">Step {idx + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-smoke">{s.body}</p>
                {s.link && (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 border-b-2 border-blood pb-1 text-sm font-extrabold uppercase tracking-wide text-bone transition-colors hover:text-blood"
                  >
                    <WhatsAppIcon size={18} />
                    {s.link.label}
                  </a>
                )}
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
