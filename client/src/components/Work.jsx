// Work.jsx — Selected work / portfolio section with two project cards and abstract mockup UIs.

import SplitText from './SplitText'

function Work() {
    return (
        <section id="work" className="py-32">
            <div className="mb-20 flex justify-between items-end">
                <SplitText
                    text="Selected Work"
                    className="font-mono text-4xl md:text-6xl font-medium tracking-tight text-main"
                    delay={30}
                    duration={0.8}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-50px"
                    textAlign="left"
                    tag="h2"
                />
                <a href="#" className="hidden md:inline-flex font-mono text-xs uppercase tracking-widest text-white/40 hover:text-main transition-colors pb-2 border-b border-white/10 hover:border-white/40">
                    View Archive
                </a>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Project 01 (Larger, Left) */}
                <div className="w-full md:w-7/12 group cursor-pointer">
                    <div className="aspect-[16/10] bg-[#0F0F14] border border-white/[0.05] rounded-sm mb-6 overflow-hidden relative p-4 flex flex-col transition-colors group-hover:border-white/[0.15]">
                        {/* Abstract Mockup UI */}
                        <div className="w-full h-8 border-b border-white/[0.05] flex items-center mb-4 gap-2">
                            <div className="w-2 h-2 rounded-sm bg-white/10"></div>
                            <div className="w-2 h-2 rounded-sm bg-white/10"></div>
                        </div>
                        <div className="flex-1 border border-white/[0.03] bg-white/[0.01] rounded-sm p-6">
                            <div className="w-1/3 h-6 bg-white/[0.05] mb-4 rounded-sm"></div>
                            <div className="w-full h-px bg-white/[0.03] mb-4"></div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-20 bg-white/[0.02] border border-white/[0.03] rounded-sm"></div>
                                <div className="col-span-2 h-20 bg-white/[0.02] border border-white/[0.03] rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-medium tracking-tight text-main">Fintech Dashboard</h3>
                        <div className="flex gap-2">
                            <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-1 rounded-sm">Next.js</span>
                            <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-1 rounded-sm">Tailwind</span>
                        </div>
                    </div>
                </div>

                {/* Project 02 (Smaller, Offset Down) */}
                <div className="w-full md:w-5/12 md:mt-32 group cursor-pointer">
                    <div className="aspect-[4/3] bg-[#0F0F14] border border-white/[0.05] rounded-sm mb-6 overflow-hidden relative p-4 flex flex-col transition-colors group-hover:border-white/[0.15]">
                        {/* Abstract Mockup UI */}
                        <div className="flex-1 border border-white/[0.03] bg-white/[0.01] rounded-sm flex flex-col justify-end p-4">
                            <div className="w-full h-32 bg-white/[0.02] border border-white/[0.03] mb-4 rounded-sm"></div>
                            <div className="w-1/2 h-4 bg-white/[0.05] rounded-sm"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-medium tracking-tight text-main">Studio Platform</h3>
                        <div className="flex gap-2">
                            <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-1 rounded-sm">React</span>
                            <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-1 rounded-sm">Stripe</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Work
