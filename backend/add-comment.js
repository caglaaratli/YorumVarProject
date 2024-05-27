const express = require("express");
const db = require("./db");
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");

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

router.post("/", verifyToken, (req, res) => {
  const { rev_id, parent_id, comment } = req.body;
  const user_id = req.user.userId;
  console.log('Received comment data:', { rev_id, parent_id, user_id, comment }); //Gelen veri kontrol
  const query = "INSERT INTO comments (rev_id, parent_id, user_id, comment) VALUES (?, ?, ?, ?)";
  db.query(query, [rev_id, parent_id, user_id, comment], (err, results) => {
    if (err) {
      console.log('Database error:', err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    res.status(201).json({ message: "Comment added successfully", commentId: results.insertId });
  });
});

module.exports = router;
