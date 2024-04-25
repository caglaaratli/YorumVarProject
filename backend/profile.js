const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

router.get("/", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send('No token provided');
    }

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN_STRING" formatından token'ı al

    if (!token) {
        return res.status(403).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Database query failed' });
            }
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;