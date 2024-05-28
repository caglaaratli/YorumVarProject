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

router.get("/", verifyToken, (req, res) => {
  const user_id = req.user.userId; // JWT'den alınan user_id

  const query =
    "SELECT username, urun_Adi ,marka_adi, site_adi , satici_isim , teslimat_suresi , kargo_paket_puani , teslimat_puani , fiyat_puani , urun_kalite_puani , musteri_hizmetleri_puani , urun_orj , yorum, photo_url FROM reviews WHERE user_id = ?";

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "No reviews found for this user." });
    }
  });
});
module.exports = router;
