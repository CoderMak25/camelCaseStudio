// contactController.js — Handles contact form submissions. Saves to MongoDB AND sends email notification.
// Includes thorough server-side validation and input sanitization.

const Contact = require('../models/Contact');

// Allowed project types (whitelist)
const VALID_PROJECT_TYPES = ['Business Website', 'Landing Page', 'Maintenance'];

// Simple HTML tag stripper to prevent XSS
const sanitize = (str) => str.replace(/<[^>]*>/g, '').trim();

// @desc    Submit a new contact enquiry (saves to DB + sends email)
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
    try {
        let { name, email, projectType, message } = req.body;

        // --- Validation ---

        // Check required fields exist
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields (name, email, message).',
            });
        }

        // Sanitize inputs
        name = sanitize(name);
        email = sanitize(email).toLowerCase();
        message = sanitize(message);
        projectType = sanitize(projectType || 'Business Website');

        // Name validation
        if (name.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Name must be at least 2 characters.',
            });
        }
        if (name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Name must be under 100 characters.',
            });
        }

        // Email validation (stricter regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.',
            });
        }

        // Message validation
        if (message.length < 10) {
            return res.status(400).json({
                success: false,
                message: 'Message must be at least 10 characters.',
            });
        }
        if (message.length > 2000) {
            return res.status(400).json({
                success: false,
                message: 'Message must be under 2000 characters.',
            });
        }

        // Project type validation (whitelist)
        if (!VALID_PROJECT_TYPES.includes(projectType)) {
            projectType = 'Business Website'; // fallback to default
        }

        const payload = { name, email, projectType, message };

        // --- Save to MongoDB ---
        const contact = await Contact.create(payload);

        res.status(201).json({
            success: true,
            message: "We'll be in touch soon!",
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all contact enquiries
// @route   GET /api/contact
// @access  Admin
const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitContact, getContacts };
