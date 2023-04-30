const express = require("express");
const router = express.Router();

const { createCatagory, getallCatagory, editCatagory, deleteCatagory, getsinglecatagory } = require("../controller/catagoryController")

router.post("/createCatagory", createCatagory)
router.get("/getallCatagory", getallCatagory)
router.post("/editCatagory/:id", editCatagory)
router.get("/deleteCatagory/:id", deleteCatagory)
router.get("/getsinglecatagory/:id", getsinglecatagory)

module.exports = router;