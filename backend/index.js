const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL bağlantısını ayarlayın
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});

// Veritabanına bağlanmayı deneyin
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql bağlantısı okey");
});

app.post("/register", (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  // Şifreyi hashle
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send(err);
    }
    const query =
      "INSERT INTO users (name, surname, phone, mail, password) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [firstName, lastName, phone, email, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send("User registered successfully");
      }
    );
  });
});

// Express.js ile oluşturulmuş login endpoint
app.post("/login", (req, res) => {
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
