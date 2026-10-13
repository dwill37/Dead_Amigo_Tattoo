"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { photos } from "@/lib/images";
import { messages, wa } from "@/lib/site";
import { Cta } from "./ui/Cta";
import { WhatsAppIcon } from "./ui/Icons";

const LINE = "Don’t die boring";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xA = useTransform(scrollYProgress, [0, 1], reduce ? ["-10%", "-10%"] : ["0%", "-38%"]);
  const xB = useTransform(scrollYProgress, [0, 1], reduce ? ["-20%", "-20%"] : ["-40%", "-2%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  const row = (
    <>
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i} className="flex shrink-0 items-center gap-[0.3em] pr-[0.3em]">
          {LINE}
          <span className="text-blood">✕</span>
        </span>
      ))}
    </>
  );

  return (
    <section ref={ref} aria-labelledby="final-title" className="relative isolate overflow-hidden border-t border-line py-24 sm:py-32">
      <motion.div aria-hidden="true" className="absolute -inset-y-[10%] inset-x-0 -z-10" style={{ y: photoY }}>
        <Image
          src={photos.duck.src}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[center_40%] grayscale"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/80" />

      <h2 id="final-title" className="sr-only">
        {LINE}.
      </h2>
      <div aria-hidden="true" className="display select-none whitespace-nowrap text-[clamp(5rem,17vw,15rem)] leading-[0.82]">
        <motion.div className="flex" style={{ x: xA }}>
          {row}
        </motion.div>
        <motion.div className="flex text-transparent [-webkit-text-stroke:2px_var(--color-bone)]" style={{ x: xB }}>
          {row}
        </motion.div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] flex-col items-start gap-8 px-4 sm:mt-20 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
        <p className="max-w-[30ch] text-2xl font-semibold leading-snug sm:text-3xl">
          Your idea. Our needle. <span className="text-blood">One message</span> gets it started.
        </p>
        <div className="relative">
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 border-2 border-blood"
              animate={{ scale: [1, 1.12, 1.18], opacity: [0.8, 0.25, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", repeatDelay: 0.4 }}
            />
          )}
          <Cta href={wa(messages.ready)} size="xl" magnetic icon={<WhatsAppIcon size={28} />}>
            Message us on WhatsApp
          </Cta>
        </div>
      </div>
    </section>
  );
}
