// frontend/src/components/ExpertisesPreview.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

const expertises = [
    {
        id: "concevoir",
        title: "CONCEVOIR",
        phase: "STRATÉGIE & DESIGN",
        subtitle: "Architecture UX, UI & Parcours d'élite",
        desc: "Nous sculptons des interfaces modernes et intuitives, où chaque parcours utilisateur est minutieusement pensé pour valoriser votre univers et maximiser la conversion.",
        deliverables: ["Prototypage Figma", "Design System", "Direction Artistique"],
        num: "01"
    },
    {
        id: "developper",
        title: "DÉVELOPPER",
        phase: "INGÉNIERIE & PERFORMANCE",
        subtitle: "Code Sur Mesure, Robuste & Sécurisé",
        desc: "Développement sur-mesure de haute précision. Sites vitrines immersifs, e-commerces puissants et applications web fluides à la vitesse d'affichage irréprochable.",
        deliverables: ["Next.js & React", "Animations Fluides", "SEO & Vitesse Maximale"],
        num: "02"
    },
    {
        id: "evoluer",
        title: "FAIRE ÉVOLUER",
        phase: "PÉRENNITÉ & CROISSANCE",
        subtitle: "Accompagnement, Audit & Optimisation",
        desc: "Un outil digital doit grandir avec vous. Nous assurons la maintenance proactive, l'optimisation continue des performances et le suivi stratégique de vos objectifs.",
        deliverables: ["Maintenance Continue", "Audit SEO & Vitesse", "Évolutions Métier"],
        num: "03"
    },
];

export default function ExpertisesPreview() {
    const [activeId, setActiveId] = useState<string | null>("concevoir");

    return (
        <section className="py-24 bg-ivoire overflow-hidden relative border-b border-encre/10">
            {/* EN-TÊTE DE PRESTIGE : Notre Méthode (Harmonisé avec Nos Réalisations Phares) */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 mb-16 space-y-8">
                {/* Barre de métadonnées & statut */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-encre/10 pb-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-encre/5 border border-encre/10 text-encre/80 text-xs font-mono tracking-widest uppercase font-semibold">
                        <span>Méthodologie & Processus // 03 Piliers</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-encre/60 uppercase tracking-widest">
                        <span>Conception UX/UI</span>
                        <span className="text-encre/25">/</span>
                        <span>Développement Sur Mesure</span>
                        <span className="text-encre/25">/</span>
                        <span>Croissance Continue</span>
                    </div>
                </div>

                {/* Titre monumental & Bouton d'action magnétique */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-3xl">
                        <h2 className="text-encre font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.95]">
                            Notre méthode{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bleuElectrique via-blue-600 to-indigo-800">
                                éprouvée.
                            </span>
                        </h2>
                        <p className="text-encre/75 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Une démarche structurée en 3 étapes clés pour concevoir des outils digitaux sur mesure qui allient impact visuel, rigueur technique et conversion commerciale.
                        </p>
                    </div>

                    <div className="shrink-0 flex items-center">
                        <Link
                            href="/expertises"
                            className="group relative inline-flex items-center gap-3.5 bg-encre text-ivoire hover:bg-bleuElectrique px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(24,0,173,0.35)] hover:scale-105 active:scale-95"
                        >
                            <span>Découvrir nos expertises</span>
                            <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 text-base">
                                ↗
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Barre de navigation rapide interactive */}
                <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <span className="text-xs font-mono uppercase text-encre/50 tracking-wider mr-2 shrink-0 hidden md:inline">
                        Accès direct :
                    </span>
                    {expertises.map((exp) => {
                        const isSelected = activeId === exp.id;
                        return (
                            <button
                                key={exp.id}
                                onClick={() => setActiveId(isSelected ? null : exp.id)}
                                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                                    isSelected
                                        ? "bg-bleuElectrique text-ivoire shadow-[0_0_15px_rgba(24,0,173,0.35)] font-bold scale-105"
                                        : "bg-encre/5 hover:bg-encre/10 text-encre/75 hover:text-encre"
                                }`}
                            >
                                <span>{exp.num} — {exp.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Conteneur des panneaux interactifs haut de gamme */}
            <div className="flex flex-col md:flex-row min-h-[580px] md:h-[72vh] max-h-[820px] w-full border-t border-b border-encre/10">
                {expertises.map((exp) => {
                    const isActive = activeId === exp.id;

                    return (
                        <div
                            key={exp.id}
                            className={`relative group flex-1 border-r border-encre/10 last:border-r-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] cursor-pointer overflow-hidden ${
                                isActive ? "md:flex-[1.8] bg-bleuElectrique" : "md:flex-[1] bg-ivoire hover:bg-[#F7F6E2]"
                            }`}
                            onMouseEnter={() => setActiveId(exp.id)}
                            onClick={() => setActiveId(exp.id)}
                        >
                            {/* Numéro Géant en Filigrane Typographique */}
                            <span
                                className={`absolute top-4 left-4 text-[11rem] md:text-[14rem] leading-none font-black select-none pointer-events-none transition-all duration-700 ${
                                    isActive
                                        ? "text-white/[0.08] -translate-y-4 scale-105"
                                        : "text-encre/[0.04] translate-y-0"
                                }`}
                            >
                                {exp.num}
                            </span>

                            {/* Contenu de la carte interactive */}
                            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-14">
                                {/* En-tête de la carte */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`font-mono text-xs uppercase tracking-widest transition-colors duration-500 ${
                                            isActive ? "text-ivoire/70" : "text-encre/50"
                                        }`}
                                    >
                                        Étape {exp.num} // 03
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors duration-500 ${
                                            isActive
                                                ? "bg-white/15 text-ivoire border border-white/20"
                                                : "bg-encre/5 text-encre/70 border border-encre/10"
                                        }`}
                                    >
                                        {exp.phase}
                                    </span>
                                </div>

                                {/* Corps textuel dynamique */}
                                <div className="space-y-4">
                                    <h3
                                        className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight transition-colors duration-500 ${
                                            isActive ? "text-ivoire" : "text-encre"
                                        }`}
                                    >
                                        {exp.title}
                                    </h3>

                                    <p
                                        className={`font-semibold text-base sm:text-lg transition-colors duration-500 ${
                                            isActive ? "text-ivoire/90" : "text-encre/80"
                                        }`}
                                    >
                                        {exp.subtitle}
                                    </p>

                                    {/* Description et tags déroulants */}
                                    <div
                                        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] ${
                                            isActive
                                                ? "max-h-96 opacity-100 translate-y-0 pt-2"
                                                : "max-h-0 opacity-0 translate-y-4"
                                        }`}
                                    >
                                        <p className="text-ivoire/85 text-base sm:text-lg leading-relaxed font-light mb-6">
                                            {exp.desc}
                                        </p>

                                        {/* Livrables clés */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {exp.deliverables.map((item) => (
                                                <span
                                                    key={item}
                                                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-ivoire border border-white/15"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Bouton DÉCOUVRIR circulaire harmonisé */}
                                        <Link
                                            href={`/expertises#${exp.id}`}
                                            className="group/btn inline-flex items-center gap-3.5 text-ivoire cursor-pointer pt-2"
                                        >
                                            <div className="w-10 h-10 rounded-full border border-white/40 group-hover/btn:border-white group-hover/btn:bg-white/15 flex items-center justify-center transition-all duration-300 shadow-sm group-hover/btn:scale-105">
                                                <span className="text-base transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                                                    ↗
                                                </span>
                                            </div>
                                            <span className="font-semibold text-xs md:text-sm tracking-[0.2em] uppercase text-white/90 group-hover/btn:text-white transition-colors">
                                                Explorer l'expertise
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Barre animée en bas */}
                            <div
                                className={`absolute bottom-0 left-0 h-1 bg-ivoire transition-all duration-700 ease-out ${
                                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                                }`}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}