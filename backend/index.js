const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // JSON istekleri için body-parser olarak hizmet eder.

// MySQL bağlantısını ayarlayın
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

 const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor...`);
  });
  
// Veritabanına bağlanmayı deneyin
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("mysql bağlantısı okey");
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Email adresine göre kullanıcıyı bul
  const query = 'SELECT * FROM users WHERE mail = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      // Kullanıcı bulundu, şifreyi karşılaştır
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (isMatch) {
          // Şifre eşleşiyor, 
          res.status(200).json({ message: 'Login successful'});
        } else {
          // Şifre eşleşmiyor
          res.status(401).json({ message: 'Password is incorrect' });
        }
      });
    } else {
      // Kullanıcı bulunamadı
      res.status(404).json({ message: 'User not found' });
    }
  });
});


// POST endpoint
app.post('/register', (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  // Şifreyi hashle
  bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
          return res.status(500).send(err);
      }
      const query = 'INSERT INTO users (name, surname, phone, mail, password) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [firstName, lastName, phone, email, hashedPassword], (err, results) => {
          if (err) {
              return res.status(500).send(err);
          }
          res.status(200).send('User registered successfully');
      });
  });
});
  
 
  
  /*
  // Kullanıcı giriş endpoint'i
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("Kullanıcı adı ve şifre gerekli.");
    }
  
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        const comparison = await bcrypt.compare(password, results[0].password);
        if (comparison) {
          const token = jwt.sign({ userId: results[0].id }, process.env.SECRET, { expiresIn: '1h' });
          res.status(200).json({ token });
        } else {
          res.status(401).send("Şifre yanlış.");
        }
      } else {
        res.status(404).send("Kullanıcı bulunamadı.");
      }
    });
  });
  
*/