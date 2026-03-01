// Work.jsx — Selected work section with row-based layout and cursor-following hover image reveal.

import { useState, useRef, useCallback } from 'react'
import SplitText from './SplitText'

const projects = [
    {
        title: 'Dahiyo',
        category: 'Restaurant / Branding',
        image: '/images/Screenshot 2026-03-01 134617.png',
        link: 'https://dahiyo-demo.vercel.app/#story',
    },
    {
        title: 'Luxe Nails',
        category: 'Salon / E-Commerce',
        image: '/images/Screenshot 2026-03-01 135007.png',
        link: 'https://samplenails.netlify.app/',
    },
]

function Work() {
    const [archiveClicked, setArchiveClicked] = useState(false)
    const [activeRow, setActiveRow] = useState(null)
    const imgRefs = useRef([])

    const handleMouseMove = useCallback((e, index) => {
        const img = imgRefs.current[index]
        if (img) {
            img.style.top = e.clientY + 'px'
            img.style.left = (e.clientX + 20) + 'px'
        }
    }, [])

    const handleRowClick = useCallback((link) => {
        window.open(link, '_blank', 'noopener,noreferrer')
    }, [])

    return (
        <section id="work" className="py-32">
            <div className="mb-20 flex justify-between items-end">
                <SplitText
                    text="Selected Work"
                    className="font-mono text-4xl md:text-6xl font-medium tracking-tight text-main"
                    delay={30}
                    duration={0.8}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-50px"
                    textAlign="left"
                    tag="h2"
                />
                <button
                    onClick={() => setArchiveClicked(true)}
                    className="hidden md:inline-flex font-mono text-xs uppercase tracking-widest text-white/40 hover:text-main transition-colors pb-2 border-b border-white/10 hover:border-white/40 bg-transparent cursor-pointer"
                >
                    {archiveClicked ? 'Coming Soon' : 'View Archive'}
                </button>
            </div>

            <div className="work-rows">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`project-row ${activeRow === index ? 'is-active' : ''}`}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseEnter={() => setActiveRow(index)}
                        onMouseLeave={() => setActiveRow(null)}
                        onClick={() => handleRowClick(project.link)}
                    >
                        <div className="project-row__left">
                            <span className="project-row__number">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="project-row__title">{project.title}</h3>
                        </div>

                        <span className="project-row__category">{project.category}</span>

                        {/* Hover image — always rendered, visibility toggled via CSS */}
                        <div
                            className="hover-img-reveal"
                            ref={(el) => (imgRefs.current[index] = el)}
                        >
                            <img
                                src={project.image}
                                alt={`${project.title} Preview`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Work
