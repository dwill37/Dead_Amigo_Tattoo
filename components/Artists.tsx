"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { photos, type Photo } from "@/lib/images";
import { business } from "@/lib/site";
import { InstagramIcon } from "./ui/Icons";
import { SectionTitle } from "./ui/SectionTitle";

type Artist = {
  name: string;
  specialty: string;
  bio: string;
  instagramUrl: string;
  photo: Photo;
  /** CSS object-position, to frame the face inside the portrait crop. */
  focus: string;
};

/* Add a second entry to show two artists side by side. */
const artists: Artist[] = [
  {
    name: "[PLACEHOLDER: artist name]",
    specialty: "[PLACEHOLDER: specialty]",
    bio: "[PLACEHOLDER: short bio]",
    instagramUrl: business.instagramUrl,
    photo: photos.artistAtWork,
    focus: "78% 40%",
  },
];

export function Artists() {
  const reduce = useReducedMotion();
  const solo = artists.length === 1;

  return (
    <section id="artists" aria-labelledby="artists-title" className="border-t border-line bg-coal px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle id="artists-title" accent="needle.">
          The hands behind the needle.
        </SectionTitle>

        <div className={`mt-16 grid gap-16 ${solo ? "" : "lg:grid-cols-2"}`}>
          {artists.map((a) => (
            <motion.article
              key={a.name}
              initial={reduce ? false : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.35 }}
              className={`grid gap-8 ${solo ? "md:grid-cols-12 md:items-end md:gap-12" : ""}`}
            >
              <div className={`relative ${solo ? "md:col-span-6 lg:col-span-5" : ""}`}>
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden bg-ash"
                  variants={{
                    hidden: { clipPath: "inset(0% 0% 100% 0%)" },
                    shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
                  }}
                >
                  <Image
                    src={a.photo.src}
                    alt={a.photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 92vw"
                    className="object-cover grayscale-[35%]"
                    style={{ objectPosition: a.focus }}
                  />
                </motion.div>
                {/* Scan line riding the bottom edge of the mask, like a stencil being pulled. */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  variants={{
                    hidden: { y: 0, opacity: 1 },
                    shown: {
                      y: ["0%", "100%"],
                      opacity: [1, 1, 0],
                      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], opacity: { times: [0, 0.85, 1], duration: 1.25 } },
                    },
                  }}
                >
                  <span className="absolute inset-x-0 top-0 block h-1.5 -translate-y-1/2 bg-blood" />
                </motion.span>
              </div>

              <div className={solo ? "md:col-span-6 lg:col-span-6 lg:col-start-7" : ""}>
                <div className="relative inline-block overflow-hidden">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left bg-blood"
                    variants={{
                      hidden: { scaleX: 0 },
                      shown: { scaleX: 1, transition: { delay: 0.5, duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
                    }}
                  />
                  <motion.h3
                    className="display relative px-3 pb-1 pt-2 text-[clamp(2.4rem,6vw,4.5rem)] text-ink"
                    variants={{
                      hidden: { x: "-105%" },
                      shown: { x: "0%", transition: { delay: 0.75, type: "spring", stiffness: 380, damping: 30 } },
                    }}
                  >
                    {a.name}
                  </motion.h3>
                </div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    shown: { opacity: 1, y: 0, transition: { delay: 0.95 } },
                  }}
                >
                  <p className="mt-6 text-sm font-bold uppercase tracking-wider text-blood">{a.specialty}</p>
                  <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-bone/85">{a.bio}</p>
                  <a
                    href={a.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex min-h-11 items-center gap-2 border-b-2 border-bone pb-1 text-sm font-extrabold uppercase tracking-wide transition-colors hover:border-blood hover:text-blood"
                  >
                    <InstagramIcon size={18} />
                    See their work on Instagram
                  </a>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
