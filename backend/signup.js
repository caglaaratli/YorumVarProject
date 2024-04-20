
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');


router.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;
    // Şifreyi hashle
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send(err);
        }
        const query = 'INSERT INTO users (name, surname, phone, mail, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [firstName, lastName, phone, email, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send('User registered successfully');
        });
    });
  });

module.exports = router;