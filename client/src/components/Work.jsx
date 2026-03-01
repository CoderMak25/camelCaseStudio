// Work.jsx — Selected work section with row-based layout and cursor-following hover image reveal.

import { useState, useRef, useCallback, useEffect } from 'react'
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
    const rafRef = useRef(null)
    const posRef = useRef({ x: 0, y: 0 })

    const handleMouseMove = useCallback((e, index) => {
        if (activeRow !== index) return
        posRef.current.x = e.clientX
        posRef.current.y = e.clientY
        if (rafRef.current != null) return
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null
            const { x, y } = posRef.current
            const img = imgRefs.current[index]
            if (img) {
                img.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
            }
        })
    }, [activeRow])

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    const handleMouseEnter = useCallback((index, e) => {
        setActiveRow(index)
        if (e) {
            posRef.current.x = e.clientX
            posRef.current.y = e.clientY
            const img = imgRefs.current[index]
            if (img) {
                img.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
            }
        }
    }, [])

    const handleRowClick = useCallback((link) => {
        window.open(link, '_blank', 'noopener,noreferrer')
    }, [])

    return (
        <section id="work" className="py-16 md:py-32">
            <div className="mb-12 md:mb-20 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
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
                        onMouseEnter={(e) => handleMouseEnter(index, e)}
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

                        {/* Hover image — position via transform (GPU), visibility via class */}
                        <div
                            className="hover-img-reveal"
                            ref={(el) => (imgRefs.current[index] = el)}
                        >
                            <div className="hover-img-reveal__inner">
                                <img
                                    src={project.image}
                                    alt={`${project.title} Preview`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Work
