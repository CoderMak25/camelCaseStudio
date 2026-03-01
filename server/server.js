// server.js — Main entry point for the Express backend. Connects to MongoDB and handles email-based contact form.

// Load environment variables FIRST (before any other imports that depend on them)
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Lightweight cron endpoint (for external schedulers like cron-job.org)
// Hit this every 10 minutes; add real work inside if needed.
app.get('/api/cron/ping', async (req, res) => {
    try {
        // Optional simple auth using a shared secret
        if (process.env.CRON_SECRET && req.query.token !== process.env.CRON_SECRET) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // TODO: place any recurring backend work here (cleanup, metrics, etc.)
        // For now it's just a warm-up / health hit.

        res.status(200).json({ status: 'ok' });
    } catch (err) {
        console.error('Cron ping error:', err);
        res.status(500).json({ message: 'Cron failed' });
    }
});

// Error handling middleware (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
