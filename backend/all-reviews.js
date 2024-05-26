const express = require("express");
const db = require("./db");
require("dotenv").config();
const router = express.Router();

router.get("/", (req, res) => {

    const query =
      "SELECT username, urun_Adi, marka_adi ,site_adi, satici_isim, teslimat_suresi, kargo_paket_puani, teslimat_puani, fiyat_puani, urun_kalite_puani, musteri_hizmetleri_puani, urun_orj, yorum FROM reviews";
  
    db.query(query, (err, results) => {

      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "No reviews found." });
      }
    });
  });
  
module.exports = router;