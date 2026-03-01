// About.jsx — About section with founders' introduction, SplitText heading, and studio story.

import SplitText from './SplitText'

function About() {
    return (
        <section id="about" className="py-40 border-t border-white/[0.05]">
            <div className="mb-16">
                <SplitText
                    text="The Story"
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
            </div>
            <div className="max-w-4xl">
                <p className="text-3xl md:text-5xl lg:text-6xl leading-[1.2] md:leading-[1.1] font-medium tracking-tighter text-white/60">
                    We&apos;re <span className="text-main">Mayank, Ashitosh and Kaushik</span>. Three developers who got tired of watching small businesses get overcharged for bad websites. So we started camelCase Studio.
                </p>
            </div>
        </section>
    )
}

export default About
