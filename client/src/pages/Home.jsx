// Home.jsx — Main landing page that composes all section components in order.
// The first fold (Navbar + Hero + Marquee) is wrapped in a h-screen flex container
// so it always fills exactly one viewport height on any screen size.

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
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative border-x border-white/[0.02]">
            {/* First fold — fills exactly one viewport */}
            <div className="h-screen flex flex-col">
                <Navbar />
                <Hero />
                <Marquee />
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
