import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nineri — Alerts you when it matters. Video stays home.",
  description:
    "Nineri is a baby monitor in development. It alerts your phone when a sleeping baby rolls onto their tummy or their face gets covered, and it does the thinking on the device, so video stays home.",
};

export const viewport: Viewport = {
  themeColor: "#F5F3EE",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
