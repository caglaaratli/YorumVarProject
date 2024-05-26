const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT product_name FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    res.status(200).json(results);
  });
});

module.exports = router;