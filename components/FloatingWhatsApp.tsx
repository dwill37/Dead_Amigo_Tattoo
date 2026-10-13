"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import { messages, wa } from "@/lib/site";
import { WhatsAppIcon } from "./ui/Icons";

/**
 * Mobile: always on screen once the intro has played.
 * Desktop: smaller, and only after the hero (the nav CTA covers the top).
 */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [introDone, setIntroDone] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), reduce ? 0 : 2000);
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => {
      clearTimeout(t);
      mq.removeEventListener("change", sync);
    };
  }, [reduce]);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > window.innerHeight * 0.8;
    if (next !== pastHero) setPastHero(next);
  });

  const visible = introDone && (!isDesktop || pastHero);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={wa(messages.quote)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Dead Amigo on WhatsApp"
          className="group fixed right-4 z-40 flex h-14 w-14 items-center justify-center bg-blood text-ink shadow-[4px_4px_0_0_var(--color-bone)] lg:right-6 lg:h-12 lg:w-12"
          style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
          initial={{ y: 90, rotate: -25, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          whileHover={{ scale: 1.08, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
        >
          <WhatsAppIcon size={28} className="lg:h-6 lg:w-6" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-bone px-3 py-2 text-sm font-bold text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
            Get a quote on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
