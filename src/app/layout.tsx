import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { HeaderFooterWrapper } from "@/components/layout/HeaderFooterWrapper";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import {
  BUSINESS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const DEFAULT_TITLE =
  "Asaan Shaadi | Muslim Matrimonial Service in Bengaluru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "muslim matrimonial services",
    "muslim matrimonial services in bangalore",
    "muslim matrimony in bangalore",
    "muslim matrimonial near me",
    "muslim marriage near me",
    "trusted muslim matrimonial services",
    "trusted matrimonial site in india",
    "best muslim matrimonial services in hyderabad",
    "muslim matrimonial websites in india",
    "muslim matrimonial in india",
    "muslim matrimonial in delhi",
    "muslim matrimonial in hyderabad",
    "muslim matrimonial in dubai",
    "muslim matrimonial in lucknow",
    "muslim matrimonial in canada",
    "muslim matrimonial in australia",
    "muslim matrimonial in usa",
    "muslim matrimony in kerala",
    "muslim matrimony in chennai",
    "muslim matrimony in mumbai",
    "muslim matrimony in tamilnadu",
    "muslim matrimony in india",
    "muslim matrimony for divorcee",
    "muslim matrimony for doctors",
    "muslim matrimony for free",
    "matrimony sites for muslim",
    "which matrimonial site is best for muslim",
    "muslim marriage services near me",
    "muslim matrimonial office near me",
    "muslim matrimonial ads in newspaper",
    "muslim matrimonial events near me",
    "muslim pre marriage",
    "muslim pre marital counselling",
    "muslim pre marriage course",
    "muslim pre marriage questions",
    "muslim pre marriage contract",
    "muslim marriage outside of religion",
    "muslim marriage with christian",
    "muslim marriage with cousin",
    "muslim marriage with hindu",
    "muslim marriage to christian",
    "muslim marriage to cousin",
    "muslim marriage to hindu",
    "muslim marriage to catholic",
    "is muslim marriage recognised in australia",
    "are muslim marriages legal in uk",
    "is it allowed to marry a non muslim",
    "muslim marriage as a contract",
    "muslim about marriage",
    "muslim marriage for girls",
    "muslim marriage for women",
    "muslim matrimonial services in toronto",
    "muslim matrimonial services in canada",
    "muslim matrimonial services in usa",
    "muslim matrimonial services in delhi",
    "muslim matrimonial services in mumbai",
    "muslim matrimonial services in kolkata",
    "muslim matrimonial services in bihar",
    "dowry free nikah bangalore",
    "guardian verified biodata",
    "nikah matchmaking bangalore",
    "sunnah matrimony india",
  ],
  authors: [{ name: BUSINESS.legalName }],
  icons: {
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS.name,
      alternateName: [BUSINESS.legalName, "Asaan Shadi"],
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/logo.png`,
      description: BUSINESS.description,
      email: BUSINESS.email,
      telephone: BUSINESS.telephone,
      priceRange: "Free",
      serviceType: "Muslim Matrimonial and Matchmaking Service",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: BUSINESS.telephone,
          contactType: "customer service",
          contactOption: "TollFree",
          areaServed: ["IN", "AE", "CA", "US", "AU", "GB"],
          availableLanguage: ["English", "Urdu", "Hindi", "Kannada"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.streetAddress,
        addressLocality: BUSINESS.address.addressLocality,
        addressRegion: BUSINESS.address.addressRegion,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.addressCountry,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...BUSINESS.openingHours.days],
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
      areaServed: [
        { "@type": "City", name: "Bengaluru" },
        { "@type": "City", name: "Hyderabad" },
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "Mumbai" },
        { "@type": "City", name: "Chennai" },
        { "@type": "City", name: "Kolkata" },
        { "@type": "City", name: "Lucknow" },
        { "@type": "City", name: "Pune" },
        { "@type": "City", name: "Kochi" },
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      sameAs: [
        "https://www.instagram.com/asaan.shadi",
        "https://www.facebook.com/share/1cDk4F6pFE/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans-modern bg-[#252525] text-[#FAF7F2] selection:bg-[#9a6a4f] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
