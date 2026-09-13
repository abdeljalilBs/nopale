// frontend/src/components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { name: "Réalisations", href: "/realisations" },
    { name: "Expertises", href: "/expertises" },
    { name: "L'agence", href: "/agence" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-6">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full flex items-center justify-between relative">

                {/* LOGO Transparent parfaitement intégré sur la photo */}
                <Link
                    href="/"
                    className="flex items-center hover:opacity-80 transition-opacity"
                >
                    <Image
                        src="/logos/logo-nopal-white.png"
                        alt="Nopal - Agence digitale indépendante"
                        width={120}
                        height={63}
                        className="h-8 md:h-9 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Navigation Desktop : Centrée au milieu, lisible sur la photo */}
                <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-ivoire/80 hover:text-ivoire font-medium transition-colors text-sm uppercase tracking-wider"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Bouton Contact Bleu Électrique : Aligné à droite */}
                <div className="hidden md:flex items-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-bleuElectrique text-ivoire text-sm font-semibold hover:bg-[#12008A] hover:scale-105 transition-all shadow-lg shadow-bleuElectrique/30"
                    >
                        Contact
                        <span className="ml-1">→</span>
                    </Link>
                </div>

                {/* Menu Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-ivoire"
                    aria-label="Ouvrir le menu"
                >
                    <div className={`w-6 h-0.5 bg-ivoire mb-1.5 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <div className={`w-6 h-0.5 bg-ivoire transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <div className={`w-6 h-0.5 bg-ivoire transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Menu Mobile Plein Écran */}
            <div className={`fixed inset-0 bg-encre/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-ivoire text-3xl">×</button>
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-ivoire hover:text-bleuElectrique transition-colors">
                        {link.name}
                    </Link>
                ))}
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="mt-8 bg-bleuElectrique text-ivoire px-10 py-4 rounded-full font-bold text-xl shadow-lg shadow-bleuElectrique/30">
                    Parler d'un projet
                </Link>
            </div>
        </header>
    );
}