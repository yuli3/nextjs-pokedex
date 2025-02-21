import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleAdSense } from "@/components/Adsense";
import { Providers } from '@/app/provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() : Promise<Metadata> {
  return {
    title: {
      template: "%s",
      default: "Pokédex - Gotta Catch Em All!",
    },
    description:
      "Explore the comprehensive Pokedex with detailed information about every Pokemon. Search, browse, and discover Pokemon stats, abilities, evolutions, and more!",
    keywords: [
      'pokemon', 'pokedex',
      'Pokedex', 'Pokemon list', 'Pokemon database',
      'Pokemon information',
      'Pokemon encyclopedia',
      'Pokemon guide',
      'Pokemon search',
      'Pokemon details',
      'Pokemon evolution',
      'Pokemon types',
      'Pokemon abilities',
      'Pokemon stats'
    ],
    authors: [{ name: "ahoxy" }],
    openGraph: {
      title: "Pokédex - Gotta Catch Em All!",
      description:
        "Explore the comprehensive Pokedex with detailed information about every Pokemon. Search, browse, and discover Pokemon stats, abilities, evolutions, and more!",
      url: process.env.NEXT_PUBLIC_BASE_URL,
      siteName: "ahoxy",
      images: [
        {
          url: process.env.NEXT_PUBLIC_BASE_URL + "/ms-icon-310x310.png",
          width: 1024,
          height: 1024,
          alt: "pokédex - Gotta Catch Em All!",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Pokédex - Gotta Catch Em All!",
      description:
        "Explore the comprehensive Pokedex with detailed information about every Pokemon. Search, browse, and discover Pokemon stats, abilities, evolutions, and more!",
      images: [process.env.NEXT_PUBLIC_BASE_URL + "/ms-icon-310x310.png"],
    },
    robots: "index, follow",
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
        { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
        { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
        { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
        { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
        { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
        { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
        { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
        { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "apple-icon-precomposed",
          url: "/apple-icon-precomposed.png",
        },
      ],
    },
    other: {
      "msapplication-TileColor": "#ffffff",
      "msapplication-TileImage": "/ms-icon-144x144.png",
      "naver-site-verification": "5559cc1a94ea3362b32eaa05b7e7f5a9f6c08796"
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-915L6V38X6" />
        <GoogleAdSense />
      </body>
    </html>
  );
}
