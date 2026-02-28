// Footer.jsx — Site footer with copyright and social media links.

function Footer() {
    return (
        <footer className="py-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-mono text-xs uppercase tracking-widest text-white/30">
                © camelCase Studio 2025
            </p>

            <div className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/30">
                <a href="#" className="hover:text-main transition-colors">Instagram</a>
                <a href="#" className="hover:text-main transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-main transition-colors">GitHub</a>
            </div>
        </footer>
    )
}

export default Footer
