const express = require("express");
const cors = require("cors");
const registerRouter = require("./register");
const loginRouter = require("./login");
const profileRouter = require("./profile");
const addreviewRouter = require("./new-review");
const reviewCountRouter = require("./review-count");
const loginUserReviewRouter = require("./login-user-review");
const allReviewsRouter = require("./all-reviews");
const updateUserInfoRouter = require("./update-user-info");
const deleteUserAccountRouter=require("./delete-user-account");
const getBrandsNameRouter = require("./get-brands");


const db = require("./db");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, // Credential'ların (çerezler, HTTP yetkilendirme başlıkları vb.) gönderilmesine izin ver
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/new-review", addreviewRouter);
app.use("/review-count", reviewCountRouter);
app.use("/login-user-review", loginUserReviewRouter);
app.use("/all-reviews", allReviewsRouter);
app.use("/update-user-info", updateUserInfoRouter);
app.use("/delete-user-account", deleteUserAccountRouter);
app.use("/get-brands", getBrandsNameRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
