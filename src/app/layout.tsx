
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  // keep this minimal; HTML lang is set in your [locale]/layout
  return (
    <html lang="" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
