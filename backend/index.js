const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const signupRouter = require('./register');
const loginRouter = require('./login');

// /signup endpoint'i için signupRouter'ı kullan
app.use(signupRouter);
// /login endpoint'i için loginRouter'ı kullan
app.use(loginRouter);


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


 
  