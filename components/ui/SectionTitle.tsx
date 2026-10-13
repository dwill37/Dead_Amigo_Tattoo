"use client";

import { motion } from "framer-motion";

type Props = {
  id?: string;
  children: string;
  /** Word (exact match) painted in the accent color. */
  accent?: string;
  className?: string;
};

const word = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { type: "spring" as const, stiffness: 420, damping: 32 } },
};

/** H2 whose words rise through masks when it scrolls into view. */
export function SectionTitle({ id, children, accent, className = "" }: Props) {
  const words = children.split(" ");
  return (
    <motion.h2
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.06 }}
      className={`display text-[clamp(3rem,11vw,8.5rem)] ${className}`}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
            <motion.span variants={word} className={`inline-block ${w === accent ? "text-blood" : ""}`}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.h2>
  );
}
