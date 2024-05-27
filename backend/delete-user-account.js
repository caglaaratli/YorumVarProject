const express = require("express");
const db = require("./db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

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
  const userId = req.user.userId;
  console.log(`Attempting to delete user with ID: ${userId}`);

  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      throw err;
    }

    db.query("DELETE FROM reviews WHERE user_id = ?", [userId], (error, results) => {
      if (error) {
        console.error("Error deleting from reviews:", error);
        return db.rollback(() => {
          throw error;
        });
      }

      db.query("DELETE FROM comments WHERE user_id = ?", [userId], (error, results) => {
        if (error) {
          console.error("Error deleting from comments:", error);
          return db.rollback(() => {
            throw error;
          });
        }

        db.query("DELETE FROM users WHERE id = ?", [userId], (error, results) => {
          if (error) {
            console.error("Error deleting from users:", error);
            return db.rollback(() => {
              throw error;
            });
          }

          db.commit((err) => {
            if (err) {
              console.error("Error committing transaction:", err);
              return db.rollback(() => {
                throw err;
              });
            }
            res.send({
              message: "User and related data successfully deleted.",
            });
          });
        });
      });
    });
  });
});

module.exports = router;
