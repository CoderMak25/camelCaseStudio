// Hero.jsx — Hero: headline + 3D camel. Natural height, no viewport filling.

import CamelScene from './CamelScene'

function Hero() {
    return (
        <main className="flex items-start md:items-center w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start md:items-center w-full pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-10">
                {/* Typography — first on mobile */}
                <div className="lg:col-span-6 relative z-10 order-1">
                    <p className="mb-3 sm:mb-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/50 flex items-center gap-2 sm:gap-4">
                        <span className="w-6 sm:w-8 h-px bg-white/25 flex-shrink-0" aria-hidden />
                        Web Design &amp; Development Studio, India
                    </p>
                    <h1
                        className="text-[2.25rem] leading-[1.05] tracking-tighter text-main sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal"
                        style={{ fontFamily: "'Archivo Black', sans-serif" }}
                    >
                        <span className="block">We build websites</span>
                        <span className="block text-white/70">that mean</span>
                        <span className="block text-accent">business.</span>
                    </h1>
                </div>

                {/* 3D Camel — second on mobile, fixed height so layout is predictable */}
                <div className="lg:col-span-6 relative w-full order-2 h-[200px] sm:h-[260px] md:h-[380px] lg:h-[500px] flex-shrink-0">
                    <CamelScene />
                </div>
            </div>
        </main>
    )
}

export default Hero
