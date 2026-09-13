// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nopal — Agence digitale indépendante",
  description: "Conception de sites web, boutiques en ligne et applications web sur mesure.",
  icons: {
    icon: "/logos/logo-nopal-transparent.png",
    shortcut: "/logos/logo-nopal-transparent.png",
    apple: "/logos/logo-nopal-transparent.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      {/* FOND IVOIRE, TEXTE ENCRE */}
      <body className="bg-ivoire text-encre font-sans antialiased min-h-screen selection:bg-bleuElectrique selection:text-ivoire">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}