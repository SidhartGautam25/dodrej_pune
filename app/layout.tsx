import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://godrejpropertypune.com"),
  title: "Godrej Property Pune | Premium Apartments & Plots in Pune",
  description: "Discover premium residential apartments & plots by Godrej Properties in Pune. Check pricing, floor plans, location, and exclusive offers on Godrej Property Pune.",
  keywords: "Godrej Property Pune, Godrej Properties Pune, Godrej Pune, godrejproperpune, Godrej Projects Pune, Hinjewadi, Baner, Magarpatta, Keshav Nagar, Kharadi, Godrej Eden Estate, Godrej The Greenfront, Godrej Evergreen Square, The Aqua Retreat, Godrej River Royale",
  authors: [{ name: "Godrej Properties" }],
  alternates: {
    canonical: "https://godrejpropertypune.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/godrej_logo_final.jpeg", type: "image/jpeg" }
    ],
    apple: "/godrej_logo_final.jpeg",
  },
  openGraph: {
    title: "Godrej Property Pune | Premium Apartments & Plots in Pune",
    description: "Discover premium residential apartments & plots by Godrej Properties in Pune. Check pricing, floor plans, location, and exclusive offers.",
    url: "https://godrejpropertypune.com",
    siteName: "Godrej Property Pune",
    images: [
      {
        url: "/godrej_logo_final.jpeg",
        width: 800,
        height: 600,
        alt: "Godrej Property Pune Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import QueryProvider from "@/app/components/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Godrej Property Pune",
              "image": "https://godrejpropertypune.com/godrej_logo_final.jpeg",
              "url": "https://godrejpropertypune.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pune",
                "addressRegion": "MH",
                "addressCountry": "IN"
              },
              "description": "Discover premium residential apartments & plots by Godrej Properties in Pune. Check pricing, floor plans, location, and exclusive offers on Godrej Property Pune.",
              "priceRange": "₹75 Lacs - ₹3.15 Cr"
            })
          }}
        />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
