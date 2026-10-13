import type { Metadata, Viewport } from "next";
import { Archivo, Permanent_Marker } from "next/font/google";

import { MotionProvider } from "@/components/MotionProvider";
import { SITE_URL, business, hours } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker-hand",
  display: "swap",
});

const title = "Dead Amigo Tattoo | Tattoo Shop in Cancún, Custom Tattoos";
const description =
  "Tattoo shop in Cancún for custom tattoos. See the work, send your idea on WhatsApp and get your quote from Dead Amigo Tattoo, C. 4 582, Cancún.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: ["tattoo shop Cancún", "tattoo artist Cancún", "custom tattoos Cancún", "tattoo studio Cancún", "Dead Amigo Tattoo"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: business.name,
    title,
    description,
    // app/opengraph-image.jpg is picked up automatically; alt lives in opengraph-image.alt.txt
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0a0a",
  colorScheme: "dark",
};

function jsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: business.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.jpg`,
    telephone: business.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    // [PLACEHOLDER: confirm coordinates] decoded from plus code 44WQ+95
    geo: { "@type": "GeoCoordinates", latitude: business.geo.latitude, longitude: business.geo.longitude },
    sameAs: [business.instagramUrl],
  };
  // [PLACEHOLDER: days and opening time] added only once hours.schemaDays/schemaOpens are set.
  if (hours.schemaDays.length && hours.schemaOpens) {
    data.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.schemaDays,
      opens: hours.schemaOpens,
      closes: hours.closes,
    };
  }
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${marker.variable}`}>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-blood focus:px-4 focus:py-3 focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      </body>
    </html>
  );
}
