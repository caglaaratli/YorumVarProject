const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
          const token = jwt.sign({ userId: user.id  , name : user.name , surname : user.surname , email:user.mail , phoneNumber:user.phone  }, process.env.JWT_SECRET, {
            expiresIn: "4h",
          });
          res.status(200).json({ token: token, userId: user.id, email: user.mail, name: user.name }); // Token ve kullanıcı bilgilerini gönder
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
