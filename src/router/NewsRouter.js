const express = require("express");
const router = express.Router();

const { userNews } = require("../controller/NewsController")

router.post("/userNews", userNews);

module.exports = router;