// frontend/src/components/AgencySection.tsx
import Image from "next/image";

export default function AgencySection() {
    return (
        <section className="py-32 bg-ivoire overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">

                {/* En-tête de section */}
                <div className="mb-16 md:mb-24">
                    <span className="text-bleuElectrique font-mono text-sm tracking-widest uppercase mb-4 block">
                        L'HUMAIN DERRIÈRE LE DIGITAL
                    </span>
                    <h2 className="text-encre font-bold text-4xl md:text-6xl tracking-tight leading-[1.1] max-w-4xl">
                        Une agence indépendante,<br />
                        <span className="text-bleuElectrique">à taille humaine.</span>
                    </h2>
                </div>

                {/* Layout Asymétrique : Photo + Texte */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Colonne Photo (Gauche) */}
                    <div className="lg:col-span-7 relative group">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-encre/5 shadow-2xl shadow-encre/10">
                            {/* Placeholder pour la photo de Fayçal & Melissa ou Atelier */}
                            {/* Remplace src par "/images/team.jpg" quand tu auras la vraie photo */}
                            <Image
                                src="/images/hero-signature.jpg" // Utilisation temporaire de la sculpture comme placeholder visuel cohérent
                                alt="L'équipe Nopal en pleine création"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Badge flottant sur la photo */}
                            <div className="absolute bottom-8 left-8 bg-ivoire/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-encre/5 max-w-xs">
                                <p className="text-encre font-bold text-sm uppercase tracking-wide mb-1">Basés en France</p>
                                <p className="text-encre/70 text-xs">Disponibles pour vos projets digitaux complexes.</p>
                            </div>
                        </div>

                        {/* Élément décoratif arrière-plan */}
                        <div className="absolute -z-10 top-[-20px] left-[-20px] w-full h-full border-2 border-bleuElectrique/10 rounded-2xl" />
                    </div>

                    {/* Colonne Texte (Droite) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-encre">
                                Fayçal & Melissa
                            </h3>
                            <p className="text-encre/70 text-lg leading-relaxed">
                                Nous sommes deux passionnés du web, réunis par une même obsession : <strong>la qualité sans compromis</strong>.
                                Loin des grandes structures impersonnelles, nous vous offrons une relation directe, transparente et réactive.
                            </p>
                            <p className="text-encre/70 text-lg leading-relaxed">
                                Chez Nopal, chaque projet est unique. Nous ne vendons pas des packages, nous construisons des solutions sur mesure qui servent <strong>votre croissance réelle</strong>.
                            </p>
                        </div>

                        {/* Liste de valeurs (Style épuré) */}
                        <ul className="space-y-4 pt-4">
                            {[
                                "Écoute active et conseil stratégique",
                                "Design sur mesure, jamais de templates",
                                "Code propre et performances optimales",
                                "Accompagnement humain jusqu'au bout"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-encre/80 font-medium">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-bleuElectrique shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Signature / CTA discret */}
                        <div className="pt-8 border-t border-encre/10">
                            <a href="/contact" className="inline-flex items-center gap-2 text-bleuElectrique font-bold hover:gap-4 transition-all">
                                Rencontrer l'équipe <span className="text-xl">→</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}