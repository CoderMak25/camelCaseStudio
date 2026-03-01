// Home.jsx — Main landing page. First fold flows naturally (no fixed viewport).

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import Work from '../components/Work'
import About from '../components/About'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

function Home() {
    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative border-x border-white/[0.02]">
            {/* First fold: natural height — navbar, hero, gap, marquee */}
            <div className="flex flex-col pt-[env(safe-area-inset-top)]">
                <Navbar />
                <Hero />
                <div className="mt-6 md:mt-8 lg:mt-10">
                    <Marquee />
                </div>
            </div>

            {/* Rest of the page */}
            <Services />
            <HowItWorks />
            <Work />
            <About />
            <CTA />
            <Footer />
        </div>
    )
}

export default Home
