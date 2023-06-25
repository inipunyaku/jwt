const jwt = require("jsonwebtoken");
const model = require("../models/");

const refreshToken = async (req, res) => {
  try {
    console.log(req.cookies.refresh_token);
    const refreshToken = await req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await model.Users.findAll({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decod) => {
      if (err) return res.sendStatus(403);
      const userId = user[0].id;
      const nama = user[0].nama;
      const email = user[0].email;
      const accessToken = jwt.sign(
        { userId, nama, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15s",
        }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = refreshToken;
