// contactRoutes.js — Defines API routes for contact form submissions.

const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');

// POST /api/contact — Submit a new enquiry
router.post('/', submitContact);

// GET /api/contact — Retrieve all enquiries (admin use)
router.get('/', getContacts);

module.exports = router;
