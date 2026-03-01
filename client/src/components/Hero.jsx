// Hero.jsx — Hero section with main headline, subtitle label, and 3D camel model.
// Uses flex-1 to grow and fill available space between Navbar and Marquee in the viewport.

import CamelScene from './CamelScene'

function Hero() {
    return (
        <main className="flex-1 flex items-center py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative w-full">
                {/* Left: Typography */}
                <div className="lg:col-span-6 relative z-10">
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

                {/* Right: 3D Camel Model */}
                <div className="lg:col-span-6 relative hidden lg:block" style={{ height: '500px' }}>
                    <CamelScene />
                </div>
            </div>
        </main>
    )
}

export default Hero
