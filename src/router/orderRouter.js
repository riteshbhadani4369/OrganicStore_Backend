const express = require("express")
const router = express.Router()

const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder,sendSms } = require("../controller/orderController");

router.post("/order/new", newOrder);
router.get("/order/me/:id", myOrders);
router.get("/order/:id", getSingleOrder);
router.get("/admin/orders", getAllOrders);
router.post("/send-sms", sendSms);
router.route("/admin/order/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;