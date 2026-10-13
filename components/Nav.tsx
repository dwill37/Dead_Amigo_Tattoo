"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { brand } from "@/lib/images";
import { business, messages, navLinks, wa } from "@/lib/site";
import { CloseIcon, InstagramIcon, WhatsAppIcon } from "./ui/Icons";
import { useFocusTrap } from "./ui/useFocusTrap";

export function Nav() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Only flips React state when crossing the threshold, not on every frame.
  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 48;
    if (next !== solid) setSolid(next);
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-top border-b border-line bg-ink/92 backdrop-blur-md"
        initial={false}
        animate={{ opacity: solid ? 1 : 0, scaleY: solid ? 1 : 1.4 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Scrim keeps the nav readable over the photo before it turns solid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/80 to-transparent transition-opacity duration-300"
        style={{ opacity: solid ? 0 : 1 }}
      />
      <motion.nav
        aria-label="Main"
        className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10"
        initial={false}
        animate={{ y: solid ? 0 : 10 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      >
        <motion.a
          href="#top"
          className="relative block shrink-0 origin-left"
          animate={{ scale: solid ? 0.82 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          aria-label="Dead Amigo Tattoo, back to top"
        >
          <Image src={brand.logo} alt="" className="h-11 w-auto sm:h-12" sizes="80px" />
        </motion.a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative block px-3 py-2 text-sm font-bold uppercase tracking-wider text-bone/85 transition-colors hover:text-bone"
              >
                {l.label}
                <span className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 bg-blood transition-transform duration-300 ease-[var(--ease-snap)] group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <motion.a
            href={wa(messages.quote)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduce ? undefined : { y: -2, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden min-h-11 items-center gap-2 bg-blood px-4 text-sm font-extrabold uppercase tracking-wide text-ink [font-variation-settings:'wdth'_80] sm:inline-flex"
          >
            <WhatsAppIcon size={17} />
            Get a quote on WhatsApp
          </motion.a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border-2 border-bone/80 lg:hidden"
          >
            <span className="sr-only">Open menu</span>
            <span className="h-0.5 w-5 bg-bone" />
            <span className="h-0.5 w-5 translate-x-1 bg-bone" />
            <span className="h-0.5 w-5 bg-bone" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef);
  useEffect(() => closeRef.current?.focus(), []);

  return (
    <motion.div
      ref={dialogRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col overscroll-contain bg-blood text-ink"
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      exit={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <span translate="no" className="display text-3xl">Dead Amigo</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center border-2 border-ink"
        >
          <span className="sr-only">Close menu</span>
          <CloseIcon size={22} />
        </button>
      </div>

      <motion.ul
        className="flex flex-1 flex-col justify-center gap-1 px-4 sm:px-6"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
      >
        {navLinks.map((l, i) => (
          <li key={l.href} className="overflow-hidden">
            <motion.a
              href={l.href}
              onClick={onClose}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { type: "spring", stiffness: 380, damping: 26 } },
              }}
              className="display flex items-baseline gap-3 py-1 text-[clamp(3.25rem,15vw,6rem)]"
            >
              <span className="text-base font-bold tabular-nums [font-variation-settings:'wdth'_100]">0{i + 1}</span>
              {l.label}
            </motion.a>
          </li>
        ))}
      </motion.ul>

      <motion.div
        className="flex flex-col gap-3 border-t-2 border-ink px-4 py-5 sm:px-6"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.55 } }}
      >
        <a
          href={wa(messages.quote)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-3 bg-ink text-lg font-extrabold uppercase text-bone [font-variation-settings:'wdth'_80]"
        >
          <WhatsAppIcon size={20} />
          Get a quote on WhatsApp
        </a>
        <a
          href={business.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center gap-2 font-bold"
        >
          <InstagramIcon size={18} />
          {business.instagramHandle}
        </a>
      </motion.div>
    </motion.div>
  );
}
