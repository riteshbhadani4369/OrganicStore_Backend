const express = require("express");
const router = express.Router();
const path = require("path")
const shortid = require("shortid")
const { createproduct, getAllproduct, getsingleproduct, updateproduct, deleteproduct } = require("../controller/productController")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    // filename: function (req, file, cb) {
    //     cb(null, shortid.generate() + '-' +file.originalname)
    // }
    // filename: function (req, file, cb) {
    //     let ext = path.extname(file.originalname)
    //     cb(null, Date.now() + ext)
    // }
    filename: function (req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage })

router.post("/createproduct", upload.array('productImage', 5), createproduct);
router.get("/getAllproduct", getAllproduct);
router.get("/getsingleproduct/:id", getsingleproduct);
router.post("/updateproduct/:id", updateproduct);
router.get("/deleteproduct/:id", deleteproduct);

module.exports = router