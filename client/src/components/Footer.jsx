// Footer.jsx — Site footer with copyright and social media links.

function Footer() {
    return (
        <footer className="py-8 md:py-10 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <p className="font-mono text-xs uppercase tracking-widest text-white/30 text-center md:text-left">
                © camelCase Studio 2025
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 font-mono text-xs uppercase tracking-widest text-white/30">
                <a
                    href="https://www.instagram.com/camelcase.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-main transition-colors"
                >
                    Instagram
                </a>
            </div>
        </footer>
    )
}

export default Footer
