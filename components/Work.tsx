"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { photos, type Photo } from "@/lib/images";
import { business } from "@/lib/site";
import { Cta } from "./ui/Cta";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, InstagramIcon } from "./ui/Icons";
import { SectionTitle } from "./ui/SectionTitle";
import { useFocusTrap } from "./ui/useFocusTrap";

const gallery: Photo[] = [
  photos.duck,
  photos.mask,
  photos.poppies,
  photos.numerals,
  photos.astroCats,
  photos.sleepyDog,
];

// Index layouts per breakpoint: 3 columns on desktop, 2 below.
const desktopCols = [[0, 5], [1, 3], [2, 4]];
const mobileCols = [[0, 3, 4], [1, 2, 5]];
const desktopDrift: [number, number][] = [[60, -70], [170, -170], [20, -110]];
const mobileDrift: [number, number][] = [[20, -20], [70, -70]];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<{ index: number; key: string } | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const open = (index: number, key: string, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setActive({ index, key });
  };
  const close = useCallback(() => {
    setActive(null);
    requestAnimationFrame(() => lastTrigger.current?.focus());
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => {
        if (!a) return a;
        const next = (a.index + dir + gallery.length) % gallery.length;
        return { index: next, key: `lb-${next}` };
      }),
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-title"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionTitle id="work-title" accent="ink.">
              Proof, in ink.
            </SectionTitle>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-smoke">
              Pieces from the studio. Tap one to see it up close. The full archive lives on Instagram.
            </p>
          </div>
          <Cta href={business.instagramUrl} variant="ghost" icon={<InstagramIcon size={18} />} className="self-start md:self-auto">
            See more on Instagram
          </Cta>
        </div>

        <Columns
          className="mt-16 hidden grid-cols-3 gap-6 lg:grid"
          cols={desktopCols}
          drift={desktopDrift}
          progress={scrollYProgress}
          reduce={!!reduce}
          prefix="d"
          onOpen={open}
        />
        <Columns
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:hidden"
          cols={mobileCols}
          drift={mobileDrift}
          progress={scrollYProgress}
          reduce={!!reduce}
          prefix="m"
          onOpen={open}
        />
      </div>

      <AnimatePresence>
        {active && <Lightbox index={active.index} layoutKey={active.key} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}

type ColumnsProps = {
  className: string;
  cols: number[][];
  drift: [number, number][];
  progress: MotionValue<number>;
  reduce: boolean;
  prefix: string;
  onOpen: (index: number, key: string, el: HTMLButtonElement) => void;
};

function Columns({ className, cols, drift, progress, reduce, prefix, onOpen }: ColumnsProps) {
  return (
    <div className={className}>
      {cols.map((items, c) => (
        <Column key={c} drift={reduce ? [0, 0] : drift[c]} progress={progress} offset={c % 2 === 1}>
          {items.map((photoIndex, row) => {
            const key = `${prefix}-${photoIndex}`;
            const flip = (c + row) % 2 === 0;
            return (
              <motion.li
                key={key}
                style={{ perspective: 1200 }}
                initial={reduce ? false : flip ? { opacity: 0, rotateY: -65, x: -30 } : { opacity: 0, y: 90 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 160, damping: 20, delay: ((c * 2 + row * 3) % 5) * 0.07 }}
              >
                <button
                  type="button"
                  onClick={(e) => onOpen(photoIndex, key, e.currentTarget)}
                  className="group relative block w-full overflow-hidden bg-ash"
                  aria-label={`View larger: ${gallery[photoIndex].alt}`}
                >
                  <motion.div
                    layoutId={key}
                    className="relative"
                    style={{ aspectRatio: `${gallery[photoIndex].src.width} / ${gallery[photoIndex].src.height}` }}
                  >
                    <Image
                      src={gallery[photoIndex].src}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 31vw, 46vw"
                      className="object-cover [@media(hover:hover)]:transition-[transform,filter] [@media(hover:hover)]:duration-500 [@media(hover:hover)]:ease-[var(--ease-out-hard)] [@media(hover:hover)]:[filter:contrast(0.96)_saturate(0.85)] [@media(hover:hover)]:group-hover:scale-[1.05] [@media(hover:hover)]:group-hover:[filter:contrast(1.18)_saturate(1)]"
                    />
                  </motion.div>
                  <span
                    aria-hidden="true"
                    className="marker pointer-events-none absolute bottom-3 left-3 -rotate-3 bg-blood px-2 py-0.5 text-sm text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:-rotate-6 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    up close
                  </span>
                </button>
              </motion.li>
            );
          })}
        </Column>
      ))}
    </div>
  );
}

function Column({
  children,
  drift,
  progress,
  offset,
}: {
  children: React.ReactNode;
  drift: [number, number];
  progress: MotionValue<number>;
  offset: boolean;
}) {
  const y = useTransform(progress, [0, 1], drift);
  return (
    <motion.ul style={{ y }} className={`flex flex-col gap-3 sm:gap-6 ${offset ? "pt-10 lg:pt-0" : ""}`}>
      {children}
    </motion.ul>
  );
}

function Lightbox({
  index,
  layoutKey,
  onClose,
  onStep,
}: {
  index: number;
  layoutKey: string;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef);
  const photo = gallery[index];
  const ratio = photo.src.width / photo.src.height;

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Tattoo ${index + 1} of ${gallery.length}`}
      className="fixed inset-0 z-[70] flex items-center justify-center overscroll-contain p-4"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        key={layoutKey}
        layoutId={layoutKey}
        initial={layoutKey.startsWith("lb-") ? { opacity: 0, scale: 0.94 } : false}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-ash"
        style={{ aspectRatio: `${ratio}`, width: `min(92vw, calc(80dvh * ${ratio}))` }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <Image src={photo.src} alt={photo.alt} fill sizes="92vw" className="object-cover" />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-4 sm:p-6"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
      >
        <button type="button" onClick={() => onStep(-1)} className="flex h-12 w-12 items-center justify-center border-2 border-bone bg-ink text-bone hover:bg-bone hover:text-ink">
          <span className="sr-only">Previous tattoo</span>
          <ArrowLeftIcon />
        </button>
        <p className="line-clamp-2 max-w-[60ch] text-center text-sm text-bone/85">{photo.alt}</p>
        <button type="button" onClick={() => onStep(1)} className="flex h-12 w-12 items-center justify-center border-2 border-bone bg-ink text-bone hover:bg-bone hover:text-ink">
          <span className="sr-only">Next tattoo</span>
          <ArrowRightIcon />
        </button>
      </motion.div>

      <motion.button
        ref={closeRef}
        type="button"
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.6 }}
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center bg-blood text-ink sm:right-6 sm:top-6"
      >
        <span className="sr-only">Close</span>
        <CloseIcon size={22} />
      </motion.button>
    </motion.div>
  );
}
