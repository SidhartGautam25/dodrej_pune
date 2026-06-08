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
  title: "Godrej Projects Pune | Premium Apartments & Plotted Developments",
  description: "Avail pre-launch offers, special payment plans, and fully furnished 1, 2, 3 & 4 BHK homes by Godrej Properties in Pune's prime locations.",
  keywords: "Godrej Pune, Godrej Properties Pune, Hinjewadi, Baner, Magarpatta, Keshav Nagar, Kharadi, Godrej Eden Estate, Godrej The Greenfront, Godrej Evergreen Square, The Aqua Retreat, Godrej River Royale",
  authors: [{ name: "Godrej Properties" }],
};

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
        {children}
      </body>
    </html>
  );
}
