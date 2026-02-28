// NotFound.jsx — Custom 404 page matching the neo brutalist theme of the site.

import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative border-x border-white/[0.02] min-h-screen flex flex-col justify-center items-start">
            <div className="mb-12 font-mono text-xs uppercase tracking-widest text-white/40 flex items-center gap-4">
                <span className="w-8 h-px bg-white/20 block"></span>
                Error 404
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter leading-[0.9] text-main mb-8">
                <span className="block mb-2">Page not</span>
                <span className="block text-accent">found.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/40 mb-16 tracking-tight font-light max-w-xl">
                Looks like this page doesn&apos;t exist. Maybe the URL is wrong, or the page was moved.
            </p>

            <Link
                to="/"
                className="text-lg md:text-xl text-accent hover:text-white transition-colors flex items-center gap-4 group tracking-tight font-medium border border-accent/30 hover:border-accent px-8 py-4 rounded-sm"
            >
                Back to home
                <span className="font-mono font-light text-lg md:text-xl group-hover:translate-x-2 transition-transform">→</span>
            </Link>
        </div>
    )
}

export default NotFound
