const steps = [
    { num: "01", title: "Comprendre", desc: "Analyser votre besoin réel et vos contraintes techniques." },
    { num: "02", title: "Concevoir", desc: "Élaborer la réponse adaptée à votre contexte métier." },
    { num: "03", title: "Développer", desc: "Produire et tester avec rigueur et transparence." },
    { num: "04", title: "Accompagner", desc: "Mettre en ligne et assurer le suivi post-lancement." }
];

export default function MethodPreview() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 bg-ivoire border-t border-encre/5">
            <div className="max-w-[1440px] mx-auto">
                <h2 className="text-encre font-semibold text-4xl md:text-5xl mb-20 animate-reveal">Notre méthode</h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {steps.map((step, i) => (
                        <div key={step.num} className="space-y-4 animate-reveal" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                            <span className="text-bleuElectrique font-mono text-sm">{step.num}</span>
                            <h3 className="text-encre font-semibold text-2xl">{step.title}</h3>
                            <p className="text-encre/70 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}