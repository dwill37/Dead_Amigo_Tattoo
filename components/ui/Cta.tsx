"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type Variant = "blood" | "bone" | "ghost";

const variants: Record<Variant, string> = {
  blood: "bg-blood text-ink shadow-[5px_5px_0_0_var(--color-bone)] hover:shadow-[8px_8px_0_0_var(--color-bone)]",
  bone: "bg-bone text-ink shadow-[5px_5px_0_0_var(--color-blood)] hover:shadow-[8px_8px_0_0_var(--color-blood)]",
  ghost: "border-2 border-bone/80 text-bone hover:border-bone hover:bg-bone/10",
};

const sizes = {
  md: "min-h-12 px-5 text-[15px] gap-2.5",
  lg: "min-h-14 px-6 text-base sm:text-lg gap-3",
  xl: "min-h-16 px-7 text-lg sm:min-h-20 sm:px-10 sm:text-2xl gap-3.5",
};

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** Every quote/booking button on the page. External links open in a new tab. */
export function Cta({
  href,
  children,
  variant = "blood",
  size = "md",
  icon,
  magnetic = false,
  className = "",
  ariaLabel,
}: CtaProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 18, mass: 0.4 });
  const external = href.startsWith("http");

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (!magnetic || reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={reduce ? undefined : { rotate: -1.2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className={`inline-flex shrink-0 items-center justify-center text-center leading-tight sm:whitespace-nowrap font-extrabold uppercase tracking-wide transition-[box-shadow,background-color,border-color] duration-200 [font-variation-settings:'wdth'_80] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon}
      <span>{children}</span>
    </motion.a>
  );
}
