import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/_components/common/Navbar";

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
  openGraph: {
    title: "Encounter Checklist",
    description: "Checklist for encounter church service prep",
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png', // Must be an absolute URL
    //     width: 800,
    //     height: 600,
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
