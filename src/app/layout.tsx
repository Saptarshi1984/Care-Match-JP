
import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP, Inter } from "next/font/google";

// Fonts (auto-preloaded, subsetted)
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp"
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

// Global (non-localized) SEO defaults.
// Localized title/description are set in src/app/[locale]/layout.tsx (below).
export const metadata: Metadata = {
  metadataBase: new URL("https://carematch.jp"),
  applicationName: "CareMatch Japan",
  keywords: ["care", "volunteer", "elderly support", "Japan", "community"],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "CareMatch Japan",
    type: "website",
    url: "https://carematch.jp",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CareMatch Japan" }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_handle",           // <-- fill if you have one
    creator: "@your_handle",        // <-- fill if you have one
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png"
  },
  manifest: "/site.webmanifest",
  // Language alternates (root). Your locale layout will set <html lang="">
  alternates: {
    languages: {
      en: "https://carematch.jp/en",
      ja: "https://carematch.jp/"
    }
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1216" }
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // keep this minimal; HTML lang is set in your [locale]/layout
  return (
    <html lang="ja" suppressHydrationWarning
    className={`${notoSansJp.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
