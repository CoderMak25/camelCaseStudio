// Marquee.jsx — Infinite scrolling marquee strip showing tech stack keywords.
// Uses two identical content blocks side-by-side so translateX(-50%) creates a seamless loop.

function Marquee() {
    const items = ['HTML', 'CSS', 'React', 'Next.js', 'Figma', 'Webflow', 'JavaScript', 'Node.js']

    const renderItems = () =>
        items.map((item, index) => (
            <span key={index}>
                <span className="mx-4">{item}</span>
                <span className="mx-4">·</span>
            </span>
        ))

    return (
        <div className="border-y border-white/[0.05] overflow-hidden py-4 bg-base relative flex">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-base to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-base to-transparent z-10"></div>

            <div
                className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-widest text-white/20 inline-flex"
            >
                {/* First copy */}
                {renderItems()}
                {/* Duplicate for seamless loop */}
                {renderItems()}
            </div>
        </div>
    )
}

export default Marquee
