import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.shortName} | Negocios Inmobiliarios`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Ventas, compras, alquileres, administración y tasaciones profesionales en Esperanza y la región.",
  openGraph: {
    title: siteConfig.name,
    description:
      "Inmuebles urbanos y rurales con acompañamiento profesional, mirada estratégica y atención personalizada.",
    images: ["/brand/og-cover.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description:
      "Inmuebles urbanos y rurales con acompañamiento profesional, mirada estratégica y atención personalizada.",
    images: ["/brand/og-cover.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
