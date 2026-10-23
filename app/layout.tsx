import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Tiro_Devanagari_Marathi } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const tiroDevanagari = Tiro_Devanagari_Marathi({
  variable: "--font-tiro-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000"
  ),
  title: "Shalin Weds Satvik",
  description:
    "Join us as we begin our forever \u00b7 26\u201327 December 2026, Hill Rock Resort, Karjat",
  openGraph: {
    title: "Shalin Weds Satvik",
    description:
      "Join us as we begin our forever \u00b7 26\u201327 December 2026, Hill Rock Resort, Karjat",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shalin Weds Satvik",
    description:
      "Join us as we begin our forever \u00b7 26\u201327 December 2026, Hill Rock Resort, Karjat",
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
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${tiroDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: '#1A0E0E', color: '#F5EBD9' }}>{children}</body>
    </html>
  );
}
