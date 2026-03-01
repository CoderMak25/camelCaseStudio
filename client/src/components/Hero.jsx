// Hero.jsx — Hero section with main headline, subtitle label, and asymmetric browser mockup.
// Uses flex-1 to grow and fill available space between Navbar and Marquee in the viewport.

function Hero() {
    return (
        <main className="flex-1 flex items-center py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative w-full">
                {/* Left: Typography */}
                <div className="lg:col-span-7 relative z-10">
                    <div className="mb-4 md:mb-6 font-mono text-xs uppercase tracking-widest text-white/40 flex items-center gap-4">
                        <span className="w-8 h-px bg-white/20 block"></span>
                        Web Design &amp; Development Studio, India
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tighter leading-[0.9] text-main" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                        <span className="block mb-2">We build websites</span>
                        <span className="block mb-2 text-white/60">that mean</span>
                        <span className="block text-accent">business.</span>
                    </h1>
                </div>

                {/* Right: Asymmetric Mockup */}
                <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                    {/* Raw browser frame, slightly tilted */}
                    <div className="border border-white/[0.08] bg-base p-1.5 transform md:rotate-[-2deg] shadow-2xl z-0 rounded-sm">
                        {/* Browser Header */}
                        <div className="border-b border-white/[0.08] pb-1.5 flex items-center px-2 gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-sm bg-white/20"></div>
                            <div className="w-1.5 h-1.5 rounded-sm bg-white/20"></div>
                            <div className="w-1.5 h-1.5 rounded-sm bg-white/20"></div>
                            <div className="ml-4 flex-1">
                                <div className="h-3 w-1/3 bg-white/[0.03] border border-white/[0.05] rounded-sm"></div>
                            </div>
                        </div>
                        {/* Browser Content (Abstract wireframe) */}
                        <div className="aspect-[16/10] bg-gradient-to-br from-white/[0.02] to-transparent p-4 md:p-6 flex flex-col gap-3 overflow-hidden relative">
                            {/* Architectural grid lines inside the mockup */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                            <div className="w-1/2 h-6 bg-white/[0.05] border border-white/[0.05] relative z-10 rounded-sm"></div>
                            <div className="w-3/4 h-2.5 bg-white/[0.03] relative z-10 mt-1 rounded-sm"></div>
                            <div className="w-2/3 h-2.5 bg-white/[0.03] relative z-10 mb-4 rounded-sm"></div>

                            <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
                                <div className="h-16 bg-white/[0.02] border border-white/[0.05] rounded-sm"></div>
                                <div className="h-16 bg-white/[0.02] border border-white/[0.05] rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Hero
