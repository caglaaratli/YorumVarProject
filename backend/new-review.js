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

// Marka_adi'ya göre brand_id'yi bulma veya yeni marka ekleyip brand_id'yi döndüren fonksiyon
const getOrCreateBrandId = (brandName, callback) => {
  const selectQuery = "SELECT brand_id FROM brands WHERE brand_name = ?";
  db.query(selectQuery, [brandName], (err, results) => {
    if (err) return callback(err);

    if (results.length > 0) {
      return callback(null, results[0].brand_id);
    } else {
      const insertQuery = "INSERT INTO brands (brand_name) VALUES (?)";
      db.query(insertQuery, [brandName], (err, result) => {
        if (err) return callback(err);
        return callback(null, result.insertId);
      });
    }
  });
};

router.post("/", verifyToken, (req, res) => {
  const {
    urun_adi,
    marka_adi,
    site_adi,
    satici_isim,
    teslimat_suresi,
    kargo_paket_puani,
    teslimat_puani,
    fiyat_puani,
    urun_kalite_puani,
    musteri_hizmetleri_puani,
    urun_orj,
    yorum,
  } = req.body;

  const user_id = req.user.userId; // JWT'den alınan user_id
  const username = req.user.username; // JWT'den alınan kullanıcı adı

  // Marka_id'yi bul veya oluştur
  getOrCreateBrandId(marka_adi, (err, brandId) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }

    const query =
      "INSERT INTO reviews (user_id, username, urun_adi, marka_adi, brands_id, site_adi, satici_isim, teslimat_suresi, kargo_paket_puani, teslimat_puani, fiyat_puani, urun_kalite_puani, musteri_hizmetleri_puani, urun_orj, yorum) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [
        user_id,
        username,
        urun_adi,
        marka_adi,
        brandId, 
        site_adi,
        satici_isim,
        teslimat_suresi,
        kargo_paket_puani,
        teslimat_puani,
        fiyat_puani,
        urun_kalite_puani,
        musteri_hizmetleri_puani,
        urun_orj,
        yorum,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error", error: err });
        }
        res.status(201).json({ message: "Review added successfully", reviewId: results.insertId });
      }
    );
  });
});

module.exports = router;
