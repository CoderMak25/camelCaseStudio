// Services.jsx — Lists the three core services with numbered rows and hover interactions.

function Services() {
    const services = [
        { number: '01', title: 'Business Websites' },
        { number: '02', title: 'Landing Pages & Portfolios' },
        { number: '03', title: 'Maintenance & Support' },
    ]

    return (
        <section className="py-32 border-b border-white/[0.05]">
            <div className="mb-20">
                <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">Our Expertise</h2>
            </div>

            <ul className="flex flex-col">
                {services.map((service) => (
                    <li
                        key={service.number}
                        className="group flex flex-col md:flex-row md:items-center py-10 md:py-16 border-t border-white/[0.05] hover:bg-white/[0.01] transition-colors cursor-default"
                    >
                        <div className="w-full md:w-32 mb-4 md:mb-0 font-mono text-lg text-white/20 group-hover:text-white/40 transition-colors">
                            {service.number}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-main group-hover:translate-x-2 md:group-hover:translate-x-6 transition-transform duration-500 ease-out">
                                {service.title}
                            </h3>
                        </div>
                        <div className="hidden md:block text-2xl text-white/10 group-hover:text-white/80 transition-colors font-light">
                            →
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Services
