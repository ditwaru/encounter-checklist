import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encounter Checklist",
  description: "Checklist for encounter church service prep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="Encounter Checklist" />
        <meta property="og:description" content="Checklist for encounter church service prep" />
        <meta property="og:image" content="public/pictures/this-is-home.webp" />
      </Head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          text-black
          antialiased
          min-h-screen
          bg-gradient-to-b from-rose-300 to-blue-300
          `}
      >
        {children}
      </body>
    </html>
  );
}
