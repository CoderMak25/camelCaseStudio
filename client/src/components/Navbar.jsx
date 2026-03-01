// Navbar.jsx — Top navigation bar with logo, nav links, and CTA. Mobile: hamburger menu.

import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const scrollTo = (e, id) => {
        e.preventDefault()
        setMobileMenuOpen(false)
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [mobileMenuOpen])

    const navLinks = (
        <>
            <a href="#work" onClick={(e) => scrollTo(e, 'work')} className="hover:text-main transition-colors">Work</a>
            <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-main transition-colors">About</a>
            <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-main transition-colors">Contact</a>
        </>
    )

    return (
        <nav className="flex items-center justify-between py-4 sm:py-5 md:py-8 border-b border-white/[0.05]">
            <NavLink to="/" className="font-mono text-xs sm:text-sm tracking-tight text-main hover:opacity-70 transition-opacity whitespace-nowrap" onClick={() => setMobileMenuOpen(false)}>
                camelCase Studio
            </NavLink>

            <div className="hidden md:flex items-center gap-12 font-mono text-xs uppercase tracking-widest text-white/50">
                {navLinks}
            </div>

            <div className="flex items-center gap-4">
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hidden md:flex text-sm font-medium tracking-tight text-main hover:text-accent transition-colors items-center gap-2">
                    Start a project <span className="font-mono font-light">→</span>
                </a>

                {/* Hamburger button — visible on mobile */}
                <button
                    type="button"
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                    className="md:hidden p-2 -mr-2 text-main hover:text-accent transition-colors"
                    onClick={() => setMobileMenuOpen((o) => !o)}
                >
                    <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 md:hidden bg-base/95 backdrop-blur-sm transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!mobileMenuOpen}
            >
                <div className="flex flex-col items-center justify-center min-h-screen gap-10 font-mono text-lg uppercase tracking-widest text-white/70">
                    <a href="#work" onClick={(e) => scrollTo(e, 'work')} className="hover:text-main transition-colors">Work</a>
                    <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-main transition-colors">About</a>
                    <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-main transition-colors">Contact</a>
                    <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="text-accent hover:text-white transition-colors font-medium mt-4">
                        Start a project →
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
