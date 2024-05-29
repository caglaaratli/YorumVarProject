const express = require("express");
const db = require("./db");
const router = express.Router();

const replaceTurkishChars = (str) => {
  const turkishMap = {
    'ı': '[ıI]',
    'ş': '[şŞ]',
    'ğ': '[ğĞ]',
    'ü': '[üÜ]',
    'ö': '[öÖ]',
    'ç': '[çÇ]',
    'i': '[iİ]'
  };

  return str.split('').map(char => turkishMap[char] || char).join('');
};

router.get("/:productName", (req, res) => {
  let productName = req.params.productName.toLowerCase(); 
  productName = replaceTurkishChars(productName); 
  
  const query = `SELECT * FROM reviews WHERE urun_Adi REGEXP ?`;

  db.query(query, [productName], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

module.exports = router;
