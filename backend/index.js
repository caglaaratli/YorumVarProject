const express = require("express");
const cors = require("cors");
const registerRouter = require("./register");
const loginRouter = require("./login");
const profileRouter = require("./profile");
const db = require("./db");
const cookieParser = require('cookie-parser'); 
require("dotenv").config();

const corsOptions = {
  origin: 'http://localhost:5173', // Frontend uygulamanızın adresi
  credentials: true, // Credential'ların (çerezler, HTTP yetkilendirme başlıkları vb.) gönderilmesine izin ver
};



const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
