const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../model/paymentModel");

const checkout = async (req, res) => {
    const instance = new Razorpay({
        key_id: "rzp_test_VNWhrgeOoOO1qR",
        key_secret: "gGHiM655zWebvOVO4VqM9YA8",
    });

    console.log(req.body.amount);

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
        success: true,
        order,
    });
}
const paymentverification = async (req, res) => {
    // console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', 'gGHiM655zWebvOVO4VqM9YA8')
        .update(body.toString())
        .digest('hex');
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {

        const pyamentdata = await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.status(200).send(pyamentdata);

    } else {
        res.status(400).json({
            success: false,
        });
    }
};

module.exports = { checkout, paymentverification }