const express = require("express");
const { checkout, paymentverification } = require("../controller/paymentController");
const router = express.Router();

router.post("/checkout", checkout)
router.post("/paymentverification", paymentverification)

module.exports = router