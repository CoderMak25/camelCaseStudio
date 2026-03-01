// Marquee.jsx — Infinite scrolling marquee. Two identical blocks + -50% loop for seamless infinite scroll.

function Marquee() {
    const items = ['HTML', 'CSS', 'React', 'Next.js', 'Figma', 'Webflow', 'JavaScript', 'Node.js']

    const renderCopy = (copyKey) =>
        items.map((item, index) => (
            <span key={`${copyKey}-${index}`} className="mx-3 sm:mx-4 whitespace-nowrap">
                {item}
                <span className="mx-1 sm:mx-2 opacity-50">·</span>
            </span>
        ))

    return (
        <div className="border-y border-white/[0.08] overflow-hidden py-2.5 sm:py-3 bg-base relative flex flex-shrink-0 items-center min-h-[40px]">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none" aria-hidden />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none" aria-hidden />
            <div className="animate-marquee font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/30 inline-flex items-center gap-0 flex-nowrap">
                {renderCopy('a')}
                {renderCopy('b')}
            </div>
        </div>
    )
}

export default Marquee
