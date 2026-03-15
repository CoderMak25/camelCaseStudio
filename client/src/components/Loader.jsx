// Loader.jsx — Full-screen loading overlay. Matches the website's dark theme.
// Fades out once the 'camel-loaded' event fires (dispatched by CamelScene.jsx).

import { useState, useEffect } from 'react'

function Loader() {
    const [visible, setVisible] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        const onLoaded = () => {
            // Small delay so the user can see the animation complete
            setTimeout(() => {
                setFadeOut(true)
                setTimeout(() => setVisible(false), 700) // match CSS transition
            }, 400)
        }

        window.addEventListener('camel-loaded', onLoaded)

        // Fallback: hide loader after 8s even if model fails
        const fallback = setTimeout(onLoaded, 8000)

        return () => {
            window.removeEventListener('camel-loaded', onLoaded)
            clearTimeout(fallback)
        }
    }, [])

    if (!visible) return null

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0A0A0F',
                transition: 'opacity 0.7s ease',
                opacity: fadeOut ? 0 : 1,
                pointerEvents: fadeOut ? 'none' : 'all',
            }}
        >
            {/* Logo text */}
            <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#F0F0F0',
                marginBottom: '2rem',
            }}>
                camelCase
                <span style={{ color: '#3B82F6' }}>.</span>
            </div>

            {/* Animated loading bar */}
            <div style={{
                width: 'min(200px, 50vw)',
                height: '2px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '40%',
                    backgroundColor: '#3B82F6',
                    borderRadius: '2px',
                    animation: 'loader-slide 1.2s ease-in-out infinite',
                }} />
            </div>

            {/* Inline keyframes */}
            <style>{`
                @keyframes loader-slide {
                    0% { left: -40%; }
                    50% { left: 100%; }
                    100% { left: -40%; }
                }
            `}</style>
        </div>
    )
}

export default Loader
