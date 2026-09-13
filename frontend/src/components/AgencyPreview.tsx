// frontend/src/components/AgencyPreview.tsx
import Link from "next/link";
import Image from "next/image";

export default function AgencyPreview() {
    return (
        <section className="py-24 bg-ivoire overflow-hidden relative border-b border-encre/10">
            {/* EN-TÊTE DE PRESTIGE : L'Agence (Harmonisé avec Nos Réalisations Phares) */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 mb-16 space-y-8">
                {/* Barre de métadonnées & statut */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-encre/10 pb-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-encre/5 border border-encre/10 text-encre/80 text-xs font-mono tracking-widest uppercase font-semibold">
                        <span>L'Humain Derrière Le Digital</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-encre/60 uppercase tracking-widest">
                        <span>Fayçal & Melissa</span>
                        <span className="text-encre/25">/</span>
                        <span>Fondateurs & Artisans</span>
                        <span className="text-encre/25">/</span>
                        <span>Implication Totale</span>
                    </div>
                </div>

                {/* Titre monumental & Bouton d'action magnétique */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-3xl">
                        <h2 className="text-encre font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.95]">
                            L'agence à taille{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bleuElectrique via-blue-600 to-indigo-800">
                                humaine.
                            </span>
                        </h2>
                        <p className="text-encre/75 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Nopal est une agence digitale indépendante. Fayçal et Melissa vous accompagnent de la conception à la mise en ligne avec une implication totale dans chaque projet.
                        </p>
                    </div>

                    <div className="shrink-0 flex items-center">
                        <Link
                            href="/agence"
                            className="group relative inline-flex items-center gap-3.5 bg-encre text-ivoire hover:bg-bleuElectrique px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(24,0,173,0.35)] hover:scale-105 active:scale-95"
                        >
                            <span>Découvrir l'agence</span>
                            <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 text-base">
                                ↗
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Présentation visuelle & fondateurs */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-7 relative group">
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-encre/5 shadow-xl border border-encre/10">
                            {/* Image d'équipe / atelier avec fallback sécurisé */}
                            {Boolean("/images/hero-signature.jpg") && (
                                <Image
                                    src=""
                                    alt="L'atelier Nopal"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-encre/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-ivoire">
                                <div>
                                    <p className="font-bold text-sm uppercase tracking-wider">Atelier Nopal</p>
                                    <p className="text-ivoire/70 text-xs font-mono">Basés en France / Disponibilité directe</p>
                                </div>
                                <span className="text-xs font-mono uppercase bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                    100% Dédié
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                        <h3 className="text-2xl sm:text-3xl font-bold text-encre">
                            Fayçal & Melissa
                        </h3>
                        <p className="text-encre/75 text-base sm:text-lg leading-relaxed font-light">
                            Loin des structures impersonnelles, nous cultivons une relation directe, réactive et transparente. Aucun intermédiaire : vous échangez directement avec les concepteurs et développeurs de votre solution.
                        </p>
                        <div className="pt-2 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-encre/70">
                            <div className="flex items-center gap-3">
                                <span className="text-bleuElectrique font-bold">—</span>
                                <span>Design sur mesure, zéro template</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-bleuElectrique font-bold">—</span>
                                <span>Code propriétaire, ultra-rapide & sécurisé</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-bleuElectrique font-bold">—</span>
                                <span>Accompagnement continu & stratégique</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}