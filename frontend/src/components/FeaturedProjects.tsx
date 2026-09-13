// frontend/src/components/FeaturedProjects.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
    {
        id: 1,
        name: "Coffee Arts Paris",
        type: "CAFÉ & CÉRAMIQUE",
        mission: "Lieu hybride : café de spécialité, ateliers et boutique.",
        url: "https://www.coffeeartsparis.fr/",
        image: "/images/coffee-arts.jpg"
    },
    {
        id: 2,
        name: "ArchiMade",
        type: "ARCHITECTURE & 3D",
        mission: "Conception de bâtiments, permis et visualisation 3D.",
        url: "https://www.archi-made.com/",
        image: "/images/archimade.jpg"
    },
    {
        id: 3,
        name: "Mr Microbe",
        type: "ART & SCULPTURE",
        mission: "Sculptures organiques et créations sur mesure.",
        url: "https://www.mrmicrobe.fr/",
        image: "/images/mr-microbe.jpg"
    },
    {
        id: 4,
        name: "TEP SPORT",
        type: "E-COMMERCE SPORT",
        mission: "Boutique en ligne dédiée aux équipements sportifs.",
        url: "https://www.tep-sport.com/",
        image: "/images/image1.png"
    },
    {
        id: 5,
        name: "Pixaura International",
        type: "SITE VITRINE",
        mission: "Présentation internationale et services digitaux.",
        url: "https://www.pixaurainternational.fr/",
        image: "/images/image2.png"
    },
    {
        id: 6,
        name: "Padel Arena Vendômois",
        type: "CLUB & RÉSERVATION",
        mission: "Site vitrine et système de réservation de terrains.",
        url: "https://www.padelarenavendome.com/",
        image: "/images/image3.png"
    },
];

export default function FeaturedProjects() {
    const [activeId, setActiveId] = useState<number>(1);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const activeProject = projects.find((p) => p.id === activeId) || projects[0];

    // Déclenchement fluide, doux et cinématique avec intention de survol (180ms)
    const handleMouseEnter = (id: number) => {
        if (id === activeId) return;
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        hoverTimeoutRef.current = setTimeout(() => {
            setActiveId(id);
        }, 180);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    const handleClick = (id: number) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setActiveId(id);
    };

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    return (
        <section className="w-full bg-ivoire overflow-hidden">
            {/* EN-TÊTE DE PRESTIGE : Réalisations d'Exception */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-10 space-y-8 border-b border-encre/10">
                {/* Barre de métadonnées & statut */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-encre/10 pb-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-encre/5 border border-encre/10 text-encre/80 text-xs font-mono tracking-widest uppercase font-semibold">
                        <span>Sélection Officielle // 06 Projets</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-encre/60 uppercase tracking-widest">
                        <span>Conception Sur Mesure</span>
                        <span className="text-encre/25">/</span>
                        <span>E-Commerce & Vitrines</span>
                        <span className="text-encre/25">/</span>
                        <span>Performance & SEO</span>
                    </div>
                </div>

                {/* Titre monumental & Bouton d'action magnétique */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-3xl">
                        <h2 className="text-encre font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.95]">
                            Nos réalisations{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bleuElectrique via-blue-600 to-indigo-800">
                                phares.
                            </span>
                        </h2>
                        <p className="text-encre/75 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Une sélection de projets digitaux façonnés pour valoriser l'image de marque, captiver vos clients et transformer chaque visite en opportunité.
                        </p>
                    </div>

                    <div className="shrink-0 flex items-center">
                        <Link
                            href="/realisations"
                            className="group relative inline-flex items-center gap-3.5 bg-encre text-ivoire hover:bg-bleuElectrique px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(24,0,173,0.35)] hover:scale-105 active:scale-95"
                        >
                            <span>Explorer tout le portfolio</span>
                            <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 text-base">
                                ↗
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Barre de navigation rapide interactive épurée (sans pastilles/points artificiels) */}
                <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <span className="text-xs font-mono uppercase text-encre/50 tracking-wider mr-2 shrink-0 hidden md:inline">
                        Accès direct :
                    </span>
                    {projects.map((project) => {
                        const isSelected = activeId === project.id;
                        return (
                            <button
                                key={project.id}
                                onClick={() => handleClick(project.id)}
                                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${isSelected
                                    ? "bg-bleuElectrique text-ivoire shadow-[0_0_15px_rgba(24,0,173,0.35)] font-bold scale-105"
                                    : "bg-encre/5 hover:bg-encre/10 text-encre/75 hover:text-encre"
                                    }`}
                            >
                                <span>0{project.id} — {project.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* VERSION DESKTOP : Galerie Horizontale avec transition douce & cinématique */}
            <div className="hidden md:flex flex-row h-[84vh] min-h-[680px] max-h-[880px] w-full border-b border-encre/10 bg-[#0e0e12]">
                {projects.map((project) => {
                    const isActive = activeId === project.id;

                    return (
                        <div
                            key={project.id}
                            className={`relative h-full transition-[flex] duration-1000 ease-[cubic-bezier(0.35,0.05,0.2,1)] overflow-hidden border-r border-white/10 last:border-r-0 will-change-[flex] group/tab ${isActive
                                ? "flex-[8.5] bg-[#0c0d12]"
                                : "flex-[0.4] bg-[#13141b] hover:bg-[#181a24] hover:border-bleuElectrique/30 cursor-pointer"
                                }`}
                            onMouseEnter={() => handleMouseEnter(project.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(project.id)}
                        >
                            {/* --- ÉTAT INACTIF : Image d'arrière-plan tamisée avec fondu cinématographique --- */}
                            <div
                                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out ${isActive ? "opacity-0" : "opacity-20 group-hover/tab:opacity-35"
                                    }`}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover object-center filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover/tab:scale-105"
                                    sizes="80px"
                                />
                                <div className="absolute inset-0 bg-[#13141b]/85 group-hover/tab:bg-[#13141b]/60 transition-colors duration-500" />
                            </div>

                            {/* --- ÉTAT INACTIF : Onglet vertical raffiné --- */}
                            <div
                                className={`relative z-10 h-full w-full flex flex-col justify-between items-center py-8 px-2 select-none transition-all duration-500 ease-out ${isActive
                                    ? "opacity-0 pointer-events-none scale-95 duration-200"
                                    : "opacity-100 scale-100 delay-300"
                                    }`}
                            >
                                <span className="font-mono text-xs text-white/50 group-hover/tab:text-bleuElectrique tracking-widest transition-colors duration-300">
                                    0{project.id}
                                </span>

                                <div className="py-6 flex items-center justify-center flex-1">
                                    <span
                                        className="text-white/60 group-hover/tab:text-white font-semibold text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300"
                                        style={{
                                            writingMode: "vertical-rl",
                                            transform: "rotate(180deg)",
                                        }}
                                    >
                                        {project.name}
                                    </span>
                                </div>

                                <div className="w-3 h-[1px] bg-white/20 group-hover/tab:bg-white/60 transition-colors duration-300" />
                            </div>

                            {/* --- ÉTAT ACTIF : Espace dégagé & Révélation cinématique progressive --- */}
                            <div
                                className={`absolute inset-0 z-20 h-full w-full min-w-[700px] lg:min-w-[880px] xl:min-w-[1050px] flex flex-col justify-between p-6 md:p-8 lg:p-10 ${isActive
                                    ? "opacity-100 translate-y-0 pointer-events-auto transition-all duration-700 delay-250 ease-out"
                                    : "opacity-0 translate-y-2 pointer-events-none transition-opacity duration-200 ease-out"
                                    }`}
                            >
                                {/* Halo lumineux d'ambiance discret */}
                                <div className="absolute -top-24 -left-24 w-96 h-96 bg-bleuElectrique/15 rounded-full blur-3xl pointer-events-none" />

                                {/* En-tête dédié : Tous les textes et boutons sont ici */}
                                <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 shrink-0 mb-4">
                                    <div className="space-y-1.5 max-w-2xl">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-xs text-ivoire/60 tracking-widest uppercase">
                                                0{project.id} // RÉALISATION
                                            </span>
                                            <span className="bg-bleuElectrique/20 text-ivoire text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-bleuElectrique/40 uppercase tracking-wider">
                                                {project.type}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-ivoire">
                                            {project.name}
                                        </h3>
                                        <p className="text-ivoire/75 text-sm lg:text-base leading-relaxed">
                                            {project.mission}
                                        </p>
                                    </div>

                                    {/* Bouton DÉCOUVRIR (Style architectural épuré avec icône cercle flèche) */}
                                    <Link
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn inline-flex items-center gap-3.5 px-2 py-1 transition-all duration-300 shrink-0 cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="w-11 h-11 rounded-full border border-white/35 group-hover/btn:border-white group-hover/btn:bg-white/10 flex items-center justify-center transition-all duration-300 shadow-sm group-hover/btn:scale-105">
                                            <span className="text-white text-base transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                                                ↗
                                            </span>
                                        </div>
                                        <span className="text-white/85 group-hover/btn:text-white font-semibold text-xs md:text-sm tracking-[0.2em] uppercase transition-colors duration-300">
                                            Découvrir
                                        </span>
                                    </Link>
                                </div>

                                {/* Photo avec zoom et fondu cinématique doux */}
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative z-10 flex-1 min-h-0 w-full rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group/screen cursor-pointer"
                                >
                                    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                                        <Image
                                            src={project.image}
                                            alt={`Capture d'écran de ${project.name}`}
                                            fill
                                            className={`object-contain object-center transition-all duration-1000 ease-[cubic-bezier(0.35,0.05,0.2,1)] group-hover/screen:scale-[1.025] ${isActive
                                                ? "scale-100 opacity-100"
                                                : "scale-[1.04] opacity-0"
                                                }`}
                                            sizes="(max-width: 1200px) 100vw, 85vw"
                                            priority={project.id <= 3}
                                        />

                                        {/* Capsule flottante au survol de la photo */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-500 ease-out opacity-0 translate-y-3 group-hover/screen:opacity-100 group-hover/screen:translate-y-0">
                                            <div className="inline-flex items-center gap-3 bg-[#0c0d12]/90 backdrop-blur-md text-ivoire border border-white/20 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase shadow-2xl">
                                                <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-[10px]">
                                                    ↗
                                                </div>
                                                <span>Découvrir</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* VERSION MOBILE : Sélecteur d'onglets + Fiche Projet Complète avec photo normale */}
            <div className="flex md:hidden flex-col p-6 space-y-6 bg-[#0e0e12] border-b border-encre/10">
                {/* Barre de sélection scrollable horizontalement */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {projects.map((project) => {
                        const isSelected = activeId === project.id;
                        return (
                            <button
                                key={project.id}
                                onClick={() => setActiveId(project.id)}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${isSelected
                                    ? "bg-bleuElectrique text-ivoire shadow-md"
                                    : "bg-white/10 text-white/70 hover:bg-white/15"
                                    }`}
                            >
                                0{project.id} · {project.name}
                            </button>
                        );
                    })}
                </div>

                {/* Fiche du projet sélectionné sur mobile */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-ivoire/60 tracking-widest uppercase">
                            0{activeProject.id} // RÉALISATION
                        </span>
                        <span className="bg-bleuElectrique/20 text-ivoire text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-bleuElectrique/40 uppercase">
                            {activeProject.type}
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold uppercase text-ivoire">
                        {activeProject.name}
                    </h3>
                    <p className="text-ivoire/75 text-sm">
                        {activeProject.mission}
                    </p>

                    {/* Photo normale directe sans cadre PC sur mobile */}
                    <Link
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={activeProject.image}
                                alt={`Capture d'écran de ${activeProject.name}`}
                                fill
                                className="object-contain object-center"
                                sizes="100vw"
                            />
                        </div>
                    </Link>

                    <Link
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-ivoire rounded-xl text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 shadow-md"
                    >
                        <div className="w-6 h-6 rounded-full border border-white/35 flex items-center justify-center text-xs">
                            ↗
                        </div>
                        <span>Découvrir le site</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}