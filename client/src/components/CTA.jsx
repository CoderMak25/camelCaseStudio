// CTA.jsx — Contact/enquiry section with a controlled form. Submits to the backend API via axios.
// Includes per-field client-side validation, inline error messages, loading state, and form reset on success.

import { useState } from 'react'
import axios from 'axios'
import SplitText from './SplitText'

function CTA() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Business Website',
        message: '',
    })
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [status, setStatus] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)

    // Validate a single field
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required.'
                if (value.trim().length < 2) return 'Name must be at least 2 characters.'
                if (value.trim().length > 100) return 'Name must be under 100 characters.'
                return ''
            case 'email':
                if (!value.trim()) return 'Email is required.'
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.'
                return ''
            case 'message':
                if (!value.trim()) return 'Message is required.'
                if (value.trim().length < 10) return 'Message must be at least 10 characters.'
                if (value.trim().length > 2000) return 'Message must be under 2000 characters.'
                return ''
            default:
                return ''
        }
    }

    // Validate all fields
    const validateForm = () => {
        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            message: validateField('message', formData.message),
        }
        setErrors(newErrors)
        setTouched({ name: true, email: true, message: true })
        return !newErrors.name && !newErrors.email && !newErrors.message
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Live validation for touched fields
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: '', message: '' })

        if (!validateForm()) return

        setLoading(true)
        try {
            const res = await axios.post('/api/contact', formData)
            setStatus({
                type: 'success',
                message: res.data.message || "We got your message! We'll reach out within 24 hours. 🙌",
            })
            setFormData({ name: '', email: '', projectType: 'Business Website', message: '' })
            setErrors({})
            setTouched({})
        } catch (err) {
            const serverMessage = err.response?.data?.message
            setStatus({
                type: 'error',
                message: serverMessage || 'Something went wrong. Please DM us on Instagram instead.',
            })
        } finally {
            setLoading(false)
        }
    }

    // Helper for input border color
    const inputClass = (field) =>
        `bg-transparent border rounded-sm px-4 py-3 text-main placeholder:text-white/20 focus:outline-none transition-colors font-light ${touched[field] && errors[field]
            ? 'border-red-400/60 focus:border-red-400'
            : 'border-white/[0.08] focus:border-accent'
        }`

    return (
        <section id="contact" className="py-32 md:py-48 border-t border-white/[0.05]">
            <div className="flex flex-col items-start">
                <div className="mb-8">
                    <SplitText
                        text="Got a project?"
                        className="font-mono text-6xl md:text-[8rem] lg:text-[10rem] font-medium tracking-tighter leading-none text-main"
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
                </div>
                <p className="text-xl md:text-3xl text-white/40 mb-16 tracking-tight font-light">
                    Let&apos;s talk. It&apos;s free.
                </p>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-6" noValidate>
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
                            onBlur={handleBlur}
                            placeholder="Your name"
                            maxLength={100}
                            className={inputClass('name')}
                        />
                        {touched.name && errors.name && (
                            <span className="text-red-400 text-xs font-mono">{errors.name}</span>
                        )}
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
                            onBlur={handleBlur}
                            placeholder="you@example.com"
                            className={inputClass('email')}
                        />
                        {touched.email && errors.email && (
                            <span className="text-red-400 text-xs font-mono">{errors.email}</span>
                        )}
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
                        <div className="flex justify-between items-center">
                            <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-white/40">
                                Message *
                            </label>
                            <span className="font-mono text-[10px] text-white/20">
                                {formData.message.length}/2000
                            </span>
                        </div>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Tell us about your project..."
                            rows="5"
                            maxLength={2000}
                            className={`${inputClass('message')} resize-none`}
                        ></textarea>
                        {touched.message && errors.message && (
                            <span className="text-red-400 text-xs font-mono">{errors.message}</span>
                        )}
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
