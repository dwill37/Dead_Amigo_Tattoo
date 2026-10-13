/**
 * Dead Amigo Tattoo: every business fact and every placeholder lives here.
 * Search the project for "[PLACEHOLDER" to find what still needs real info.
 */

// Feature flags: flip to false to hide a whole section (nav link included).
export const SHOW_ARTISTS = true;
export const SHOW_REVIEWS = true;

// [PLACEHOLDER: final domain] used for canonical URL, Open Graph and JSON-LD. Set before launch.
export const SITE_URL = "https://example.com";

export const business = {
  name: "Dead Amigo Tattoo",
  street: "C. 4 582",
  postalCode: "77534",
  city: "Cancún",
  region: "Quintana Roo",
  regionShort: "Q.R.",
  country: "MX",
  countryName: "México",
  plusCode: "44WQ+95 Cancún, Quintana Roo",
  phoneDisplay: "+52 81 8687 3504",
  phoneE164: "+528186873504",
  whatsappNumber: "528186873504",
  instagramUrl: "https://www.instagram.com/deadamigotattoo/",
  instagramHandle: "@deadamigotattoo",
  facebookUrl: "[PLACEHOLDER: Facebook link]",
  email: "[PLACEHOLDER: email]",
  googleReviewUrl: "[PLACEHOLDER: Google review link]",
  /*
   * Decoded from the plus code 44WQ+95 (full code 76HM44WQ+95).
   * [PLACEHOLDER: confirm latitude/longitude on Google Maps]
   */
  geo: { latitude: 21.14594, longitude: -86.86206 },
} as const;

export const hours = {
  closes: "22:00",
  opens: "[PLACEHOLDER: opening time]",
  days: "[PLACEHOLDER: opening days]",
  /*
   * Structured data only. Fill both with real values, e.g.
   * days: ["Monday", "Tuesday"], opens: "11:00". Left empty, the JSON-LD
   * omits openingHoursSpecification rather than publish wrong hours.
   */
  schemaDays: [] as string[],
  schemaOpens: "" as string,
};

export const fullAddress = `${business.street}, ${business.postalCode} ${business.city}, ${business.regionShort}, ${business.countryName}`;

export const mapsQuery = encodeURIComponent(
  `Dead Amigo Tattoo, ${business.street}, ${business.postalCode} ${business.city}, ${business.regionShort}`,
);
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&hl=en&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

/** Builds a wa.me link with a URL-encoded, pre-filled English message. */
export function wa(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  quote: "Hi Dead Amigo! I saw your website and I'd like a quote for a tattoo.",
  idea: "Hi Dead Amigo! I saw your website. Here's my tattoo idea (references, size, body area): ",
  ready: "Hi Dead Amigo! I saw your website and I'm ready for new ink. Can we talk about my idea?",
  faq: "Hi Dead Amigo! I saw your website and I have a question before booking: ",
  style: (style: string) =>
    `Hi Dead Amigo! I saw your website and I'd like a quote for a ${style} tattoo.`,
  artist: (artist: string) =>
    `Hi Dead Amigo! I saw your website and I'd like to book with ${artist}.`,
};

export const navLinks = [
  { href: "#styles", label: "Styles" },
  { href: "#work", label: "Work" },
  ...(SHOW_ARTISTS ? [{ href: "#artists", label: "Artists" }] : []),
  { href: "#process", label: "Process" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export function isPlaceholder(value: string) {
  return value.startsWith("[PLACEHOLDER");
}
