// CTA.jsx — Contact/enquiry section with a controlled form. Submits to the backend API via axios.
// Includes client-side validation, loading state, success/error messages, and form reset on success.

import { useState } from 'react'
import axios from 'axios'

function CTA() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Business Website',
        message: '',
    })
    const [status, setStatus] = useState({ type: '', message: '' }) // 'success' | 'error' | ''
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const validateForm = () => {
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus({ type: 'error', message: 'Please fill in all required fields.' })
            return false
        }
        const emailRegex = /^\S+@\S+\.\S+$/
        if (!emailRegex.test(formData.email)) {
            setStatus({ type: 'error', message: 'Please enter a valid email address.' })
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: '', message: '' })

        if (!validateForm()) return

        setLoading(true)
        try {
            await axios.post('/api/contact', formData)
            setStatus({
                type: 'success',
                message: "We got your message! We'll reach out within 24 hours. 🙌",
            })
            setFormData({ name: '', email: '', projectType: 'Business Website', message: '' })
        } catch {
            setStatus({
                type: 'error',
                message: 'Something went wrong. Please DM us on Instagram instead.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contact" className="py-32 md:py-48 border-t border-white/[0.05]">
            <div className="flex flex-col items-start">
                <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-medium tracking-tighter leading-none text-main mb-8">
                    Got a project?
                </h2>
                <p className="text-xl md:text-3xl text-white/40 mb-16 tracking-tight font-light">
                    Let&apos;s talk. It&apos;s free.
                </p>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-white/40">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="bg-transparent border border-white/[0.08] rounded-sm px-4 py-3 text-main placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors font-light"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-white/40">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="bg-transparent border border-white/[0.08] rounded-sm px-4 py-3 text-main placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors font-light"
                        />
                    </div>

                    {/* Project Type */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="projectType" className="font-mono text-xs uppercase tracking-widest text-white/40">
                            Project Type
                        </label>
                        <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="bg-base border border-white/[0.08] rounded-sm px-4 py-3 text-main focus:outline-none focus:border-accent transition-colors font-light appearance-none cursor-pointer"
                        >
                            <option value="Business Website">Business Website</option>
                            <option value="Landing Page">Landing Page</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-white/40">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project..."
                            rows="5"
                            className="bg-transparent border border-white/[0.08] rounded-sm px-4 py-3 text-main placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors font-light resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="self-start text-lg md:text-xl text-accent hover:text-white transition-colors flex items-center gap-4 group tracking-tight font-medium border border-accent/30 hover:border-accent px-8 py-4 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending...' : 'Send us a message'}
                        <span className="font-mono font-light text-lg md:text-xl group-hover:translate-x-2 transition-transform">→</span>
                    </button>

                    {/* Status Messages */}
                    {status.message && (
                        <div
                            className={`mt-4 text-sm font-mono tracking-wide ${status.type === 'success' ? 'text-green-400' : 'text-red-400'
                                }`}
                        >
                            {status.message}
                        </div>
                    )}
                </form>
            </div>
        </section>
    )
}

export default CTA
