/**
 * Single source of truth for site-wide constants and business NAP.
 * Anything that appears in metadata, JSON-LD, the footer or the contact page
 * should read from here so NAP can never drift again.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://asaanshaadi.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Asaan Shaadi";

export const SITE_DESCRIPTION =
  "Bengaluru's trusted Muslim matrimonial service for simple, dowry-free Nikah. Guardian-verified biodatas, photo privacy & personalised matchmaking.";

export const BUSINESS = {
  name: SITE_NAME,
  legalName: "Asaan Shaadi Matrimonial Foundation",
  description:
    "A Bengaluru-based Muslim matrimonial service for simple, sunnah-aligned Nikah with zero dowry culture, guardian-verified biodatas and photo privacy.",
  serviceType: "Muslim matrimonial and matchmaking service",
  email: "info@asaanshaadi.com",
  /** Schema.org expects an E.164-ish telephone; visible text uses telephoneDisplay. */
  telephone: "+91-98450-12439",
  telephoneDisplay: "+91 98450 12439",
  telephoneHref: "tel:+919845012439",
  whatsappUrl:
    "https://wa.me/919845012439?text=Hello%20Asaan%20Shaadi,%20I%20would%20like%20to%20inquire%20about%20matrimonial%20services",
  hours: "Monday – Sunday, 10:00 AM – 10:00 PM IST",
  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "22:00",
  },
  address: {
    // TODO(owner): confirm the exact unit number — the source copy writes the
    // stray apostrophe as "B 'Surya Enclave" / "B ' Surya Enclave". If the unit
    // is actually "B-1" or similar, update streetAddress here (single place).
    streetAddress: "B, Surya Enclave Apartment, 8th Main, BTM Layout 1st Stage",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560029",
    addressCountry: "IN",
  },
  addressDisplay:
    "B, Surya Enclave Apartment, 8th Main, BTM Layout 1st Stage, Bengaluru, Karnataka 560029, India",
  addressLines: [
    "B, Surya Enclave Apartment, 8th Main,",
    "BTM Layout 1st Stage, Bengaluru - 560029,",
    "Karnataka, India",
  ],
} as const;

/** Absolute URL for a site-relative path (e.g. "/about" -> "https://…/about"). */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
