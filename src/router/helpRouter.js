const express = require("express")
const router = express.Router()

const { help } = require("../controller/helpController")

router.post("/help", help)

module.exports = router;