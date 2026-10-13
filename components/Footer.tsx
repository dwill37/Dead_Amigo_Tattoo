import Image from "next/image";

import { brand } from "@/lib/images";
import { business, fullAddress, hours, isPlaceholder, navLinks } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "./ui/Icons";

const iconBtn =
  "flex h-11 w-11 items-center justify-center border-2 border-line text-bone transition-colors hover:border-blood hover:text-blood";

export function Footer() {
  const year = new Date().getFullYear();
  const fbReady = !isPlaceholder(business.facebookUrl);
  const emailReady = !isPlaceholder(business.email);

  return (
    <footer className="border-t-2 border-blood bg-coal px-4 pb-28 pt-16 sm:px-6 sm:pb-16 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src={brand.logo} alt="Dead Amigo" sizes="160px" className="h-auto w-36" />
          <p translate="no" className="mt-5 text-lg font-bold">Dead Amigo Tattoo</p>
          <p className="mt-1 text-smoke">Tattoo studio in Cancún, Quintana Roo.</p>
          <div className="mt-6 flex gap-3">
            <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className={iconBtn}>
              <span className="sr-only">Instagram</span>
              <InstagramIcon />
            </a>
            {/* [PLACEHOLDER: Facebook link] shows up once set in lib/site.ts */}
            {fbReady ? (
              <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className={iconBtn}>
                <span className="sr-only">Facebook</span>
                <FacebookIcon />
              </a>
            ) : (
              <span className={`${iconBtn} cursor-not-allowed opacity-40`} title={business.facebookUrl}>
                <span className="sr-only">Facebook: {business.facebookUrl}</span>
                <FacebookIcon />
              </span>
            )}
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-smoke">Visit</h2>
          <address className="mt-4 not-italic leading-relaxed">{fullAddress}</address>
          <p className="mt-4 leading-relaxed">
            {hours.days}
            <br />
            {hours.opens} to {hours.closes}
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-smoke">Contact</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`tel:${business.phoneE164}`} className="inline-flex min-h-11 items-center underline decoration-blood decoration-2 underline-offset-4 hover:text-blood">
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              {emailReady ? (
                <a href={`mailto:${business.email}`} className="inline-flex min-h-11 items-center underline decoration-blood decoration-2 underline-offset-4 hover:text-blood">
                  {business.email}
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center text-smoke">{business.email}</span>
              )}
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-smoke">Jump to</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-10 items-center hover:text-blood">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] flex-col justify-between gap-2 border-t border-line pt-6 text-sm text-smoke sm:flex-row">
        <p>© {year} Dead Amigo Tattoo. All rights reserved.</p>
        <p>Cancún, Quintana Roo, México</p>
      </div>
    </footer>
  );
}
