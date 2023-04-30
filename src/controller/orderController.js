const Order = require("../model/orderModel")
const Product = require("../model/productModel")
const twilio = require('twilio');

const newOrder = async (req, res) => {

    try {

        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, user } = req.body;

        console.log(req);
        const create = new Order({
            shippingInfo: shippingInfo,
            orderItems: orderItems,
            paymentInfo: paymentInfo,
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
            paidAt: Date.now(),
            user: user,
        })

        console.log(create);

        const orderdata = await create.save();
        res.status(200).send(orderdata);
    }
    catch (error) {
        res.status(401).send(error.message);
    }
}

const myOrders = async (req, res) => {

    const orders = await Order.find({ user: req.params.id });

    res.status(200).json({
        success: true,
        orders,
    });
}

const getSingleOrder = async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
};

const getAllOrders = async (req, res) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
}

const updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
};

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.productstock -= quantity;

    await product.save({ validateBeforeSave: false });
}

const deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
};


const sendSms = async (req, res, next) => {
    try {
        const accountSid = 'AC9598239f653af1b832069101528fe660';
        const authToken = 'de36eaafc2006f00ff134f7c7d5861b6';
        const client = new twilio(accountSid, authToken);

        // const { phone } = req.body;


        const sms = client.messages.create({
            body: 'We’ve confirmed your order. Thank you for shopping with us!',
            from: '+16514336012',
            to: '+917201886693'
        })
        // (message => console.log(message.sid));

        res.status(200).send(sms)

    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }

}

module.exports = { newOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder, sendSms }