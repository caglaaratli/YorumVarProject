const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, usernameInput, phone, email, password } = req.body;

  // Kullanıcı adının veritabanında mevcut olup olmadığını kontrol et
  try {
    const existingUsername = await getUserByUsername(usernameInput);
    if (existingUsername) {
      return res.status(200).send("Username is already in use");
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }

  // E-posta adresinin veritabanında mevcut olup olmadığını kontrol et
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(200).send("Email is already in use");
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }

  // Şifreyi hashle ve kullanıcıyı kaydet
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send(err);
    }
    const query =
      "INSERT INTO users (name, surname, username, phone, mail, password) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [firstName, lastName, usernameInput, phone, email, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send("User registered successfully");
      }
    );
  });
});

// Kullanıcı adına göre kullanıcıyı bulma işlevi
async function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
}


// Kullanıcı adına göre kullanıcıyı bulma işlevi
async function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
}

// E-posta adresine göre kullanıcıyı bulma işlevi
async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE mail = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
}

module.exports = router;
