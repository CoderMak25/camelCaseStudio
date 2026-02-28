// contactController.js — Handles contact form submissions and retrieval of all enquiries.

const Contact = require('../models/Contact');

// @desc    Submit a new contact enquiry
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
    try {
        const { name, email, projectType, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            res.status(400);
            throw new Error('Please fill in all required fields (name, email, message).');
        }

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            res.status(400);
            throw new Error('Please provide a valid email address.');
        }

        const contact = await Contact.create({
            name,
            email,
            projectType,
            message,
        });

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
