// About.jsx — About section with founders' introduction and studio story.

function About() {
    return (
        <section id="about" className="py-40 border-t border-white/[0.05]">
            <div className="mb-16">
                <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">The Story</h2>
            </div>
            <div className="max-w-4xl">
                <p className="text-3xl md:text-5xl lg:text-6xl leading-[1.2] md:leading-[1.1] font-medium tracking-tighter text-white/60">
                    We&apos;re <span className="text-main">Mayank and Ashitosh</span>. Two developers who got tired of watching small businesses get overcharged for bad websites. So we started camelCase Studio.
                </p>
            </div>
        </section>
    )
}

export default About
