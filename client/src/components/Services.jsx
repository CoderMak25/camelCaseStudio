// Services.jsx — "Our Expertise" section using the FlowingMenu component from React Bits.

import FlowingMenu from './FlowingMenu'
import SplitText from './SplitText'

const expertiseItems = [
    { link: '#', text: 'Business Websites', image: '/images/business-websites.jpg' },
    { link: '#', text: 'Landing Pages & Portfolios', image: '/images/landing-pages.png' },
    { link: '#', text: 'Maintenance & Support', image: '/images/maintenance-support.png' },
]

function Services() {
    return (
        <section className="py-32 border-b border-white/[0.05]">
            <div className="mb-20">
                <SplitText
                    text="Our Expertise"
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

            <div style={{ height: '600px', position: 'relative' }}>
                <FlowingMenu
                    items={expertiseItems}
                    speed={15}
                    textColor="#F0F0F0"
                    bgColor="#0A0A0F"
                    marqueeBgColor="#999999"
                    marqueeTextColor="#0A0A0F"
                    borderColor="rgba(255,255,255,0.1)"
                />
            </div>
        </section>
    )
}

export default Services
