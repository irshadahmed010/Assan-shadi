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
  "Asaan Shaadi | Simple, Verified Muslim Matrimony in Bengaluru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: BUSINESS.legalName }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
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
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS.name,
      alternateName: BUSINESS.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/logo.png`,
      description: BUSINESS.description,
      email: BUSINESS.email,
      telephone: BUSINESS.telephone,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: BUSINESS.telephone,
        contactType: "customer service",
        areaServed: "IN",
      },
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
      areaServed: "IN",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
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
