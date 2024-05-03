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

router.delete("/", verifyToken, (req, res) => {
  const userId = req.user.id;
  db.beginTransaction((err) => {
    if (err) {
      throw err;
    }

    db.query(
      "DELETE FROM reviews WHERE user_id = ?",
      [userId],
      (error, results) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }

        db.query(
          "DELETE FROM users WHERE id = ?",
          [userId],
          (error, results) => {
            if (error) {
              return db.rollback(() => {
                throw error;
              });
            }

            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  throw err;
                });
              }
              res.send({
                message: "User and comments successfully deleted.",
              });
            });
          }
        );
      }
    );
  });
});

module.exports = router;
