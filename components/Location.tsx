"use client";

import { motion, useReducedMotion } from "framer-motion";

import { business, directionsUrl, fullAddress, hours, mapsEmbedUrl } from "@/lib/site";
import { Cta } from "./ui/Cta";
import { ArrowUpRightIcon, ClockIcon, MapPinIcon, PhoneIcon } from "./ui/Icons";
import { SectionTitle } from "./ui/SectionTitle";

export function Location() {
  const reduce = useReducedMotion();

  return (
    <section id="location" aria-labelledby="location-title" className="border-t border-line bg-coal px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle id="location-title" accent="us.">
          Come find us.
        </SectionTitle>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* The unclipped wrapper watches the viewport; a fully clipped element never "intersects". */}
          <motion.div
            className="lg:col-span-7"
            initial={reduce ? false : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
          >
          <motion.div
            className="relative h-full min-h-[360px] overflow-hidden border-2 border-line bg-ash lg:min-h-[520px]"
            variants={{
              hidden: { clipPath: "inset(0% 100% 0% 0%)" },
              shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
            }}
          >
            <iframe
              title={`Map showing Dead Amigo Tattoo at ${fullAddress}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
            />
          </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 240, damping: 26, delay: 0.3 }}
          >
            <dl className="grid gap-8">
              <div className="relative pl-10">
                <dt className="text-sm font-bold uppercase tracking-wider text-smoke">
                  <MapPinIcon size={26} className="absolute left-0 top-0.5 text-blood" />
                  Address
                </dt>
                <dd className="mt-1 text-xl font-semibold leading-snug">
                  <address className="not-italic">
                    {business.street}
                    <br />
                    {business.postalCode} {business.city}, {business.regionShort}, {business.countryName}
                  </address>
                  <span className="mt-2 block text-base font-normal text-smoke">Plus code: {business.plusCode}</span>
                </dd>
              </div>
              <div className="relative pl-10">
                <dt className="text-sm font-bold uppercase tracking-wider text-smoke">
                  <ClockIcon size={26} className="absolute left-0 top-0.5 text-blood" />
                  Hours
                </dt>
                <dd className="mt-1 text-xl font-semibold leading-snug">
                  {hours.days}
                  <br />
                  {hours.opens} to {hours.closes}
                </dd>
              </div>
              <div className="relative pl-10">
                <dt className="text-sm font-bold uppercase tracking-wider text-smoke">
                  <PhoneIcon size={26} className="absolute left-0 top-0.5 text-blood" />
                  Phone & WhatsApp
                </dt>
                <dd className="mt-1">
                  <a href={`tel:${business.phoneE164}`} className="text-xl font-semibold underline decoration-blood decoration-2 underline-offset-4 hover:text-blood">
                    {business.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <Cta href={directionsUrl} variant="bone" size="lg" icon={<ArrowUpRightIcon size={20} />}>
                Get directions
              </Cta>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
