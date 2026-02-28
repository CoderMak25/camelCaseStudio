// HowItWorks.jsx — Three-step process section: We Talk, We Build, You Launch.

function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'We Talk',
            description: 'Strategy, alignment, and understanding your core business objectives before a single line of code is written.',
        },
        {
            number: '02',
            title: 'We Build',
            description: 'Iterative design and clean architecture. You receive regular updates as we construct the digital experience.',
        },
        {
            number: '03',
            title: 'You Launch',
            description: 'Deployment, optimization, and hand-off. We ensure everything runs perfectly in production environments.',
        },
    ]

    return (
        <section className="py-32 border-b border-white/[0.05]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                {steps.map((step) => (
                    <div key={step.number} className="flex flex-col border-l border-white/[0.05] pl-8 relative">
                        <span className="absolute top-0 left-[-1px] w-px h-12 bg-white/40"></span>
                        <div className="text-[5rem] md:text-[7rem] font-light leading-none text-white/[0.03] font-mono mb-4 tracking-tighter">
                            {step.number}
                        </div>
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-main mb-3">{step.title}</h3>
                        <p className="text-sm text-white/40 max-w-xs leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HowItWorks
