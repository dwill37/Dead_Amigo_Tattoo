"use client";

import { motion, useReducedMotion } from "framer-motion";

import { business, isPlaceholder, mapsQuery } from "@/lib/site";
import { Cta } from "./ui/Cta";
import { ArrowUpRightIcon } from "./ui/Icons";
import { SectionTitle } from "./ui/SectionTitle";

export type Review = { text: string; author: string };

/*
 * No Google reviews yet. Replace with real, verbatim reviews only
 * (max ~3 lines each), or set SHOW_REVIEWS to false in lib/site.ts.
 */
export const placeholderReviews: Review[] = [
  { text: "[PLACEHOLDER: review text]", author: "[PLACEHOLDER: first name + initial]" },
  { text: "[PLACEHOLDER: review text]", author: "[PLACEHOLDER: first name + initial]" },
  { text: "[PLACEHOLDER: review text]", author: "[PLACEHOLDER: first name + initial]" },
];

// Until the direct review link is set, send people to the Google Maps listing.
const reviewHref = isPlaceholder(business.googleReviewUrl)
  ? `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
  : business.googleReviewUrl;

export function Reviews({ reviews = placeholderReviews }: { reviews?: Review[] }) {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="reviews-title" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle id="reviews-title" accent="street.">
          Word on the street.
        </SectionTitle>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((r, idx) => (
            <motion.li
              key={idx}
              className={idx === 1 ? "md:mt-14" : idx === 2 ? "md:mt-6" : ""}
              initial={reduce ? false : { opacity: 0, x: idx % 2 ? 60 : -60, skewX: idx % 2 ? -8 : 8 }}
              whileInView={{ opacity: 1, x: 0, skewX: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 260, damping: 24, delay: idx * 0.1 }}
            >
              <figure className="flex h-full flex-col border-2 border-line bg-coal p-7 transition-colors hover:border-blood">
                <span aria-hidden="true" className="display text-7xl leading-[0.6] text-blood">
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-bone/90">{r.text}</blockquote>
                <figcaption className="mt-6 text-sm font-bold uppercase tracking-wider text-smoke">{r.author}</figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14">
          <Cta href={reviewHref} variant="ghost" icon={<ArrowUpRightIcon size={18} />}>
            Leave us a review on Google
          </Cta>
        </div>
      </div>
    </section>
  );
}
