const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/:reviewId", (req, res) => {
  const { reviewId } = req.params;
  const query = "SELECT * FROM comments WHERE rev_id = ?";
  db.query(query, [reviewId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
