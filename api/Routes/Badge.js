// Backend: routes/badge.js
const express = require('express');
const Badge = require('../Models/Badge');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const badges = await Badge.find({});
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: "Error fetching badges: " + error.message });
    }
});

module.exports = router;