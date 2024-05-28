const express = require("express");
const db = require("./db");
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});
const upload = multer({ storage: storage });

const getOrCreateProductId = (productName, callback) => {
  const selectQuery = "SELECT product_id FROM products WHERE product_name = ?";
  db.query(selectQuery, [productName], (err, results) => {
    if (err) return callback(err);

    if (results.length > 0) {
      return callback(null, results[0].product_id);
    } else {
      const insertQuery = "INSERT INTO products (product_name) VALUES (?)";
      db.query(insertQuery, [productName], (err, result) => {
        if (err) return callback(err);
        return callback(null, result.insertId);
      });
    }
  });
};

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

router.post("/", verifyToken, upload.single('photo'), (req, res) => {
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

  const photo_url = req.file ? req.file.path : null; // Fotoğraf URL'si

  // Marka_id'yi bul veya oluştur
  getOrCreateBrandId(marka_adi, (err, brandId) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }

    // Ürün_id'yi bul veya oluştur
    getOrCreateProductId(urun_adi, (err, productId) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error", error: err });
      }

      const query =
        "INSERT INTO reviews (user_id, username, urun_adi, marka_adi, brands_id, products_id, site_adi, satici_isim, teslimat_suresi, kargo_paket_puani, teslimat_puani, fiyat_puani, urun_kalite_puani, musteri_hizmetleri_puani, urun_orj, yorum, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      db.query(
        query,
        [
          user_id,
          username,
          urun_adi,
          marka_adi,
          brandId,
          productId,
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
          photo_url,
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
});

module.exports = router;
