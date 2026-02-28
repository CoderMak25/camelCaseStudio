// Navbar.jsx — Top navigation bar with logo, nav links, and CTA. Uses react-router-dom NavLink for active state highlighting.

import { NavLink } from 'react-router-dom'

function Navbar() {
    const scrollTo = (e, id) => {
        e.preventDefault()
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className="flex items-center justify-between py-8 border-b border-white/[0.05]">
            <NavLink to="/" className="font-mono text-sm tracking-tight text-main hover:opacity-70 transition-opacity">
                camelCase Studio
            </NavLink>

            <div className="hidden md:flex items-center gap-12 font-mono text-xs uppercase tracking-widest text-white/50">
                <a href="#work" onClick={(e) => scrollTo(e, 'work')} className="hover:text-main transition-colors">Work</a>
                <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-main transition-colors">About</a>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-main transition-colors">Contact</a>
            </div>

            <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="text-sm font-medium tracking-tight text-main hover:text-accent transition-colors flex items-center gap-2">
                Start a project <span className="font-mono font-light">→</span>
            </a>
        </nav>
    )
}

export default Navbar
