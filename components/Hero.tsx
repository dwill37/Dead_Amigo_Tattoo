import Image from "next/image";
import type { CSSProperties } from "react";

import { brand, photos } from "@/lib/images";
import { business, messages, wa } from "@/lib/site";
import { Cta } from "./ui/Cta";
import { ArrowDownRightIcon, InstagramIcon, WhatsAppIcon } from "./ui/Icons";
import { Parallax } from "./ui/Parallax";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * The intro is pure CSS (see globals.css) so it starts on first paint and
 * never waits for hydration. Under prefers-reduced-motion it is skipped.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
      <IntroSlab />

      <Parallax distance={140} className="-z-10">
        <div className="hero-photo absolute inset-0">
          <Image
            src={photos.stencil.src}
            alt={photos.stencil.alt}
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[60%_center] sm:object-center"
          />
        </div>
      </Parallax>
      {/* Two scrims: bottom for the headline, left for the body copy. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

      <div className="mx-auto w-full max-w-[1400px] px-4 pb-24 pt-28 sm:px-6 sm:pb-20 lg:px-10">
        <a
          href={business.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pop mb-6 inline-flex min-h-10 items-center gap-2 border border-bone/40 bg-ink/60 px-3 text-sm font-semibold text-bone backdrop-blur-sm transition-colors hover:border-blood hover:text-blood"
          style={i(-1)}
        >
          <InstagramIcon size={16} />
          Cancún · {business.instagramHandle}
        </a>

        <h1 id="hero-title" className="display text-[clamp(3.6rem,14.5vw,10.5rem)]">
          <span className="block">
            <Word n={0}>Ink</Word> <Word n={1}>that</Word>
          </span>{" "}
          <span className="block">
            <span className="relative inline-block">
              <Word n={2}>outlives</Word>
              <svg
                aria-hidden="true"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="underline-draw absolute -bottom-[0.02em] left-0 h-[0.13em] w-full overflow-visible text-blood"
              >
                <path
                  d="M3 9 C 45 3, 90 12, 130 6 S 185 4, 197 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="square"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>{" "}
            <Word n={3}>you.</Word>
          </span>
        </h1>

        <p className="pop mt-7 max-w-[34ch] text-lg leading-snug text-bone/90 sm:text-xl" style={i(-4)}>
          Custom tattoos in Cancún. Send your idea on WhatsApp and get your quote straight from the studio.
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="pop" style={i(0)}>
            <Cta
              href={wa(messages.quote)}
              size="lg"
              magnetic
              icon={<WhatsAppIcon size={22} />}
              className="w-full sm:w-auto"
            >
              Get your tattoo quote on WhatsApp
            </Cta>
          </div>
          <div className="pop" style={i(1)}>
            <Cta href="#work" variant="ghost" size="lg" icon={<ArrowDownRightIcon size={20} />} className="w-full sm:w-auto">
              See the work
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({ n, children }: { n: number; children: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.05em] align-bottom">
      <span className="slam" style={i(n)}>
        {children}
      </span>
    </span>
  );
}

/** Black slab with the logo: stamps in, glitches once, tears along a jagged seam. */
function IntroSlab() {
  const half = (cls: string) => (
    <div className={`intro-half absolute inset-0 flex items-center justify-center bg-ink ${cls}`}>
      <div className="intro-stamp w-[min(68vw,460px)]">
        <div className="intro-glitch">
          <Image src={brand.logo} alt="" loading="eager" sizes="(max-width: 680px) 68vw, 460px" className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
  return (
    <div aria-hidden="true" className="intro pointer-events-none fixed inset-0 z-[80]">
      {half("intro-top")}
      {half("intro-bottom")}
    </div>
  );
}
