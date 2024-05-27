const express = require("express");
const db = require("./db");
const router = express.Router();

router.get("/:reviewId", (req, res) => {
  const { reviewId } = req.params;
  const query = `
    SELECT c.id, c.rev_id, c.parent_id, c.user_id, c.comment, c.created_at, u.username 
    FROM comments c 
    JOIN users u ON c.user_id = u.id 
    WHERE c.rev_id = ?`;
  db.query(query, [reviewId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
