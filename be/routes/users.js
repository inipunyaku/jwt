var express = require("express");
var router = express.Router();
const model = require("../models/");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/VerifyToken");
const refreshToken = require("../controllers/RefreshToken");
const LogOut = require("../controllers/LogOut");
// const refreshToken = require("../controllers/RefreshToken");
// const refreshToken = require("../controllers/RefreshToken");

dotenv.config();

/* GET users listing. */
router.get("/", verifyToken, function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/register", async (req, res, next) => {
  try {
    const { email, nim, password, nama } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const result = await model.Users.create({
        email,
        nim,
        password: hash,
        nama,
      });
      if (result) {
        res.status(201).json({
          status: "OK",
          messages: "User berhasil dibuat",
          data: result,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error });
    console.error(error);
  }
});
router.post("/login", async function (req, res, next) {
  const { password } = req.body;
  const emailParams = req.body.email;
  const queryResult = await model.Users.findOne({
    where: {
      email: emailParams,
    },
  });

  // console.log(queryResul);;
  if (queryResult) {
    bcrypt.compare(password, queryResult.password, async (err, result) => {
      if (err || !result) {
        return res.status(401).json({
          status: "Unauthorized",
          messages: "Password salah",
        });
      }

      const userId = queryResult.id;
      const userNama = queryResult.nama;
      const userEmail = queryResult.email;
      const accessToken = jwt.sign(
        {
          userId,
          userNama,
          userEmail,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "20s",
        }
      );

      const refresh_token = jwt.sign(
        {
          userId,
          userNama,
          userEmail,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      await model.Users.update(
        { refreshToken: refresh_token },
        {
          where: {
            id: queryResult.id,
          },
        }
      );
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,

        // jika https
        // secure:true
      });

      // console.log(await req.cookie);
      return res.status(200).json({
        status: "OK",
        messages: "Login berhasil",
        data: accessToken,
        // cookie: req.cookies,
      });
    });
  } else {
    res.status(401).json({
      status: "Unauthorized",
      messages: "Email tidak terdaftar",
    });
  }
});

router.get("/token", refreshToken);
router.delete("/logout", LogOut);
module.exports = router;
