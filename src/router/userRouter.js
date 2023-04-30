const express = require("express");
const router = express.Router();

const { userRegister, userLogin, getAllUser, userDelete } = require("../controller/userController")

router.post("/userRegister", userRegister);
router.get("/admin/users", getAllUser);
router.post("/userLogin", userLogin);
router.get("/userDelete/:id", userDelete);

module.exports = router;