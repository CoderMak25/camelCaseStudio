// Services.jsx — "Our Expertise" section using the FlowingMenu component from React Bits.

import FlowingMenu from './FlowingMenu'

const expertiseItems = [
    { link: '#', text: 'Business Websites', image: '/images/business-websites.jpg' },
    { link: '#', text: 'Landing Pages & Portfolios', image: '/images/landing-pages.png' },
    { link: '#', text: 'Maintenance & Support', image: '/images/maintenance-support.png' },
]

function Services() {
    return (
        <section className="py-32 border-b border-white/[0.05]">
            <div className="mb-20">
                <h2 className="font-mono text-2xl md:text-4xl uppercase tracking-widest text-white/40">Our Expertise</h2>
            </div>

            <div style={{ height: '600px', position: 'relative' }}>
                <FlowingMenu
                    items={expertiseItems}
                    speed={15}
                    textColor="#F0F0F0"
                    bgColor="#0A0A0F"
                    marqueeBgColor="#F0F0F0"
                    marqueeTextColor="#0A0A0F"
                    borderColor="rgba(255,255,255,0.1)"
                />
            </div>
        </section>
    )
}

export default Services
