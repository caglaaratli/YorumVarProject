
const mysql = require('mysql');
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Email adresine göre kullanıcıyı bul
    const query = 'SELECT * FROM users WHERE mail = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.length > 0) {
        // Kullanıcı bulundu, şifreyi karşılaştır
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).send(err);
          }
          if (isMatch) {
            // Şifre eşleşiyor, 
            res.status(200).json({ message: 'Login successful'});
          } else {
            // Şifre eşleşmiyor
            res.status(401).json({ message: 'Password is incorrect' });
          }
        });
      } else {
        // Kullanıcı bulunamadı
        res.status(404).json({ message: 'User not found' });
      }
    });
  });
  module.exports = router