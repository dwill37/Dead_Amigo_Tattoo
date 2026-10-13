"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { business, fullAddress, hours, messages, wa } from "@/lib/site";
import { ClockIcon, InstagramIcon, MapPinIcon, WhatsAppIcon } from "./ui/Icons";
import { SectionTitle } from "./ui/SectionTitle";

type Highlight = {
  title: string;
  body: ReactNode;
  note: string;
  icon: ReactNode;
  href?: string;
  linkLabel?: string;
};

const highlights: Highlight[] = [
  {
    title: "Quotes on WhatsApp",
    body: "Send your idea, a few references and where it goes on your body. Your quote comes back in the same chat.",
    note: "no forms",
    icon: <WhatsAppIcon size={26} />,
    href: wa(messages.quote),
    linkLabel: "Start the chat",
  },
  {
    title: "Open until 22:00",
    body: (
      <>
        Late enough for after work, after the beach, after you finally decide.{" "}
        <span className="font-semibold">
          {hours.days}, from {hours.opens}.
        </span>
      </>
    ),
    note: "10 PM, really",
    icon: <ClockIcon size={26} />,
  },
  {
    title: "See it before you book",
    body: "Our work lives on Instagram. Scroll the feed, judge the linework yourself, then message us.",
    note: "no surprises",
    icon: <InstagramIcon size={24} />,
    href: business.instagramUrl,
    linkLabel: business.instagramHandle,
  },
  {
    title: "Right here in Cancún",
    body: `Find us at ${fullAddress}. Locals and visitors, same chair.`,
    note: "come by",
    icon: <MapPinIcon size={26} />,
    href: "#location",
    linkLabel: "How to get here",
  },
];

// Fixed "random" tilts so server and client render the same thing.
const tilts = [-7, 5, -4, 8];

export function WhyUs() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionTitle id="why-title" accent="simple.">
              Dead simple.
            </SectionTitle>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-smoke">
              No booking portals, no email ping-pong. A chat, a quote, a chair. Here is why people message Dead Amigo.
            </p>
          </div>
        </div>

        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          {highlights.map((h, idx) => (
            <motion.li
              key={h.title}
              className={idx % 2 === 1 ? "sm:mt-16" : ""}
              initial={reduce ? false : { opacity: 0, scale: 1.3, rotate: tilts[idx] * 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 520, damping: 19, delay: idx * 0.12 }}
            >
              <motion.article
                whileHover={reduce ? undefined : { y: -6, rotate: tilts[idx] * 0.18 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="relative flex h-full flex-col bg-bone p-6 pt-9 text-ink shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] sm:p-7 sm:pt-10"
              >
                <span aria-hidden="true" className="tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3" />
                <div className="flex items-start justify-between gap-4">
                  <span className="text-ink">{h.icon}</span>
                  <span className="marker -rotate-6 text-lg text-blood-deep">{h.note}</span>
                </div>
                <h3 className="display mt-6 text-[2.6rem] sm:text-5xl">{h.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{h.body}</p>
                {h.href && (
                  <a
                    href={h.href}
                    {...(h.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-6 inline-flex min-h-11 items-center self-start border-b-2 border-ink text-sm font-extrabold uppercase tracking-wide transition-colors hover:border-blood-deep hover:text-blood-deep"
                  >
                    {h.linkLabel}
                  </a>
                )}
              </motion.article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
