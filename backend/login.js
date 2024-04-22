const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE mail = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      // Veritabanı sorgu hatası
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          // BCrypt hatası
          return res.status(500).json({ message: "Internal server error" });
        }
        if (isMatch) {
          // Başarılı giriş
          res.status(200).json({ message: "Login successful" });
        } else {
          // Şifre yanlış
          res.status(401).json({ message: "Password is incorrect" });
        }
      });
    } else {
      // Kullanıcı bulunamadı
      res.status(404).json({ message: "User not found" });
    }
  });
});

module.exports = router;
