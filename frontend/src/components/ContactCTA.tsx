// frontend/src/components/ContactCTA.tsx
"use client";
import Link from "next/link";

export default function ContactCTA() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-ivoire">
            <div className="max-w-[1440px] mx-auto">

                {/* Conteneur Principal Style "Carte Premium" */}
                <div className="relative group overflow-hidden rounded-[3rem] bg-encre text-ivoire shadow-2xl shadow-encre/20 transition-all duration-500 hover:shadow-bleuElectrique/20">

                    {/* Fond décoratif animé (Cercle Bleu Électrique) */}
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-bleuElectrique/20 rounded-full blur-[120px] transition-all duration-700 group-hover:bg-bleuElectrique/30 group-hover:scale-110" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-12 md:p-20 gap-12">

                        {/* Partie Texte (Gauche) */}
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05]">
                                Un projet en tête ?<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-bleuElectrique to-blue-400 italic pr-2">
                                    Parlons-en.
                                </span>
                            </h2>

                            <p className="text-xl text-ivoire/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                De l'idée à la mise en ligne, nous construisons ensemble votre succès digital.
                                Réactivité, transparence et excellence technique.
                            </p>
                        </div>

                        {/* Partie Action (Droite) - Bouton Massif */}
                        <div className="shrink-0">
                            <Link
                                href="/contact"
                                className="group/btn relative inline-flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full bg-bleuElectrique text-ivoire font-bold text-2xl md:text-3xl transition-all duration-500 hover:scale-105 hover:bg-[#1a00cc] shadow-[0_0_60px_rgba(24,0,173,0.4)] overflow-hidden"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-2">
                                    Démarrer
                                    <span className="text-4xl md:text-5xl transition-transform duration-300 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2">↗</span>
                                </span>

                                {/* Effet de brillance au survol du bouton rond */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-y-full group-hover/btn:translate-y-[-100%] transition-transform duration-700" />
                            </Link>

                            <p className="text-center mt-6 text-sm text-ivoire/40 font-mono uppercase tracking-widest">
                                Réponse sous 24h
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}