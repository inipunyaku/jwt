var express = require("express");
const verifyToken = require("../middleware/VerifyToken");
var router = express.Router();

/* GET home page. */
router.get("/halo", verifyToken, function (req, res, next) {
  res.json({ halo: "halo" });
});

module.exports = router;
