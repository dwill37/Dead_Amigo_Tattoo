"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { photos, type Photo } from "@/lib/images";
import { messages, wa } from "@/lib/site";
import { Cta } from "./ui/Cta";
import { WhatsAppIcon } from "./ui/Icons";
import { SectionTitle } from "./ui/SectionTitle";

type Style = {
  name: string;
  description: string;
  price: string;
  session: string;
  photo: Photo;
};

/* Fill these in: name, description, price ("From $..."), approximate session time. */
const styles: Style[] = [
  {
    name: "[PLACEHOLDER: style name 1]",
    description: "[PLACEHOLDER: short description]",
    price: "[PLACEHOLDER: price or \"from $...\"]",
    session: "[PLACEHOLDER: approximate session time]",
    photo: photos.duck,
  },
  {
    name: "[PLACEHOLDER: style name 2]",
    description: "[PLACEHOLDER: short description]",
    price: "[PLACEHOLDER: price or \"from $...\"]",
    session: "[PLACEHOLDER: approximate session time]",
    photo: photos.poppies,
  },
  {
    name: "[PLACEHOLDER: style name 3]",
    description: "[PLACEHOLDER: short description]",
    price: "[PLACEHOLDER: price or \"from $...\"]",
    session: "[PLACEHOLDER: approximate session time]",
    photo: photos.numerals,
  },
  {
    name: "[PLACEHOLDER: style name 4]",
    description: "[PLACEHOLDER: short description]",
    price: "[PLACEHOLDER: price or \"from $...\"]",
    session: "[PLACEHOLDER: approximate session time]",
    photo: photos.astroCats,
  },
];

const HIDDEN_CUT = "polygon(0% 0%, 0% 0%, -45% 100%, -45% 100%)";
const SHOWN_CUT = "polygon(0% 0%, 145% 0%, 100% 100%, -45% 100%)";

export function Styles() {
  const reduce = useReducedMotion();

  return (
    <section id="styles" aria-labelledby="styles-title" className="border-t border-line bg-coal px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle id="styles-title" accent="poison.">
          Pick your poison.
        </SectionTitle>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-smoke">
          Four ways in. Not sure which one fits? Send the idea anyway and we will tell you straight.
        </p>

        <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
          {styles.map((s, idx) => (
            <motion.li
              key={s.name}
              className={`group flex flex-col ${idx % 2 === 1 ? "xl:mt-20" : ""}`}
              initial={reduce ? false : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delayChildren: (idx % 4) * 0.1 }}
            >
              <motion.div
                className="relative aspect-[4/5] overflow-hidden bg-ash"
                variants={{
                  hidden: { clipPath: HIDDEN_CUT },
                  shown: { clipPath: SHOWN_CUT, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } },
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    hidden: { scale: 1.3 },
                    shown: { scale: 1, transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 46vw, 92vw"
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out-hard)] group-hover:scale-[1.06]"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-1 flex-col"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  shown: { opacity: 1, y: 0, transition: { delay: 0.35, type: "spring", stiffness: 300, damping: 28 } },
                }}
              >
                <h3 className="display mt-6 text-4xl">{s.name}</h3>
                <p className="mt-3 leading-relaxed text-smoke">{s.description}</p>
                <dl className="cutline mt-5 grid grid-cols-2 gap-4 py-4 text-sm">
                  <div>
                    <dt className="font-bold uppercase tracking-wider text-bone">Price</dt>
                    <dd className="mt-1 text-smoke">{s.price}</dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase tracking-wider text-bone">Session</dt>
                    <dd className="mt-1 text-smoke">{s.session}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-6">
                  <Cta
                    href={wa(messages.style(s.name))}
                    variant="bone"
                    icon={<WhatsAppIcon size={18} />}
                    className="w-full"
                  >
                    Get a quote for this style
                  </Cta>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
