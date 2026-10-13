"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** reducedMotion="user": transform animations become instant when the OS asks for less motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
