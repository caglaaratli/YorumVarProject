const express = require("express");
const db = require("./db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

// JWT token'ı doğrulama middleware'ı
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.status(403).json({ message: "Token is invalid" });
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Authorization token not found" });
  }
};

// Kullanıcı bilgilerini güncelleme endpoint'i
router.put("/", verifyToken, (req, res) => {
    const { name, surname, username, mail, phone } = req.body;
    const user_id = req.user.userId;

    const query = `
      UPDATE users 
      SET name = ?, surname = ?, username = ?, mail = ?, phone = ?
      WHERE id = ?
    `;

    db.query(
      query,
      [name, surname, username, mail, phone, user_id],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error", error: err });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully" });
      }
    );
});
module.exports = router;