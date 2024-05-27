const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/:reviewId", (req, res) => {
  const { reviewId } = req.params;
  const query = "SELECT * FROM reviews WHERE id = ?";
  db.query(query, [reviewId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(results[0]);
  });
});

module.exports = router;
