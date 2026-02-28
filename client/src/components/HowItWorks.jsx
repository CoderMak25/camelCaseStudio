// HowItWorks.jsx — "Our Workflow" section with SplitText heading and MagicBento cards.

import SplitText from './SplitText'
import MagicBento from './MagicBento'

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

function HowItWorks() {
    return (
        <section className="py-32 border-b border-white/[0.05]">
            <div className="mb-20">
                <SplitText
                    text="Our Workflow"
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

            <MagicBento
                cards={steps}
                glowColor="58, 130, 246"
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={false}
                clickEffect={true}
                enableMagnetism={true}
                particleCount={8}
                spotlightRadius={300}
            />
        </section>
    )
}

export default HowItWorks
