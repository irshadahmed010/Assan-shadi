import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { HeaderFooterWrapper } from "@/components/layout/HeaderFooterWrapper";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Asaan Shaadi | Dignified & Simple Matrimonial Platform",
  description:
    "Asaan Shaadi connects verified, dignified families seeking simple, sunnah-aligned marriage. 100% guardian-verified biodatas, photo privacy, and zero dowry culture.",
  keywords: [
    "Matrimonial",
    "Asaan Shaadi",
    "Rishta",
    "Muslim Matrimony",
    "Indian Muslim Matrimonial",
    "Muslim Matrimony India",
    "Nikah",
    "Simple Wedding",
    "Verified Biodatas",
  ],
  authors: [{ name: "Asaan Shaadi Matrimonial Foundation" }],
  openGraph: {
    title: "Asaan Shaadi | Dignified & Simple Matrimonial Platform",
    description:
      "Find pure, verified matrimonial matches with privacy and respect. Zero commercial exploitation.",
    url: "https://asaanshaadi.com",
    siteName: "Asaan Shaadi",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans-modern bg-[#252525] text-[#FAF7F2] selection:bg-[#9a6a4f] selection:text-white">
        <SmoothScroll>
          <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
