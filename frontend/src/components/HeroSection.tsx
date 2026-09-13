// frontend/src/components/HeroSection.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!sessionStorage.getItem("nopal-hero-seen")) {
            setTimeout(() => setMounted(true), 100);
            sessionStorage.setItem("nopal-hero-seen", "true");
        } else {
            setMounted(true);
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        // Coordonnées normalisées relatives au centre (-0.5 à +0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen flex items-center overflow-hidden bg-encre"
        >

            {/* IMAGE DE FOND PLEINE LARGEUR (Effet interactif de zoom & mouvement au curseur) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                    style={{
                        transform: isHovered
                            ? `scale(1.08) translate3d(${mousePos.x * -35}px, ${mousePos.y * -25}px, 0)`
                            : "scale(1) translate3d(0, 0, 0)",
                    }}
                >
                    <Image
                        src="/images/hero-signature.jpg"
                        alt="Signature visuelle Nopal"
                        fill
                        priority
                        className="object-cover object-center opacity-50 mix-blend-luminosity"
                    />
                </div>

                {/* Halo lumineux central d'ambiance en bleu électrique */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] bg-bleuElectrique/25 rounded-full blur-[140px] pointer-events-none" />

                {/* Voile sombre cinématographique centré pour une lisibilité parfaite */}
                <div className="absolute inset-0 bg-gradient-to-b from-encre/90 via-encre/65 to-encre/95 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(23,23,23,0.45)_55%,rgba(23,23,23,0.92)_100%)] pointer-events-none" />
            </div>

            {/* CONTENU CENTRÉ MAJESTUEUX (Style TEP SPORT) */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full pt-36 pb-24 flex flex-col items-center justify-center text-center">
                <div className="max-w-5xl mx-auto space-y-8 animate-reveal">

                    {/* Badge capsule sobre et élégante */}
                    <div className="inline-flex items-center py-1.5 px-5 border border-bleuElectrique/40 rounded-full text-ivoire text-xs font-mono font-semibold uppercase tracking-[0.25em] backdrop-blur-xl bg-bleuElectrique/15 shadow-[0_0_20px_rgba(24,0,173,0.25)]">
                        <span>Agence digitale indépendante</span>
                    </div>

                    {/* Titre MASSIF et Majestueux centré */}
                    <h1 className="text-ivoire font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.04] tracking-tight drop-shadow-2xl">
                        Des solutions digitales{" "}
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-bleuElectrique to-blue-300 drop-shadow-[0_0_40px_rgba(24,0,173,0.6)]">
                            sur mesure
                        </span>
                        <br />
                        pour faire grandir vos projets.
                    </h1>

                    {/* Sous-titre raffiné centré */}
                    <p className="text-ivoire/85 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
                        Nous créons des sites web d'exception, des boutiques en ligne et des applications web performantes. Du design au développement, nous construisons l'outil digital qui servira vos objectifs réels.
                    </p>

                    {/* Boutons d'action centrés (Style TEP SPORT) */}
                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full">
                        <a
                            href="/realisations"
                            className="group relative inline-flex items-center justify-center gap-3 bg-bleuElectrique text-ivoire px-10 py-5 rounded-full font-bold text-base sm:text-lg hover:bg-[#12008A] transition-all duration-300 shadow-[0_0_35px_rgba(24,0,173,0.45)] hover:shadow-[0_0_55px_rgba(24,0,173,0.75)] hover:scale-105 active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10">Voir les réalisations</span>
                            <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </a>

                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-ivoire border border-white/20 hover:border-white/40 px-10 py-5 rounded-full font-bold text-base sm:text-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                        >
                            <span>Parler d'un projet</span>
                            <span className="text-bleuElectrique font-bold text-lg">↗</span>
                        </a>
                    </div>

                    {/* Ligne d'engagements / réassurance épurée et authentique */}
                    <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-mono text-ivoire/60 uppercase tracking-widest">
                        <span>Design Sur Mesure</span>
                        <span className="hidden sm:inline text-white/25">/</span>
                        <span>Haute Performance</span>
                        <span className="hidden sm:inline text-white/25">/</span>
                        <span>Accompagnement Dédié</span>
                    </div>

                </div>
            </div>

            {/* Cercles organiques décoratifs avec effet de profondeur */}
            <div
                className="absolute -bottom-20 -left-20 w-[35vw] h-[35vw] border border-bleuElectrique/15 rounded-full pointer-events-none opacity-40 blur-sm transition-transform duration-1000 ease-out"
                style={{
                    transform: isHovered
                        ? `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`
                        : "none",
                }}
            />
            <div
                className="absolute -top-20 -right-20 w-[40vw] h-[40vw] border border-bleuElectrique/20 rounded-full pointer-events-none opacity-40 blur-sm transition-transform duration-1000 ease-out"
                style={{
                    transform: isHovered
                        ? `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`
                        : "none",
                }}
            />
        </section>
    );
}