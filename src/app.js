require('dotenv').config()
require("./dbconnect/connect")

const express = require("express");
var bodyParser = require('body-parser')
var cors = require('cors')
const path = require("path")
const app = express();
const { config } = require("dotenv");

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(express.json());

const port = process.env.PORT || 5000
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const catagoryRouter = require("./router/catagoryRouter");
const newsletter = require("./router/NewsRouter");
const help = require("./router/helpRouter");
const paymentRouter = require("./router/paymentRouter");
const orederRouter = require("./router/orderRouter");

app.use(userRouter);
app.use(productRouter);
app.use(catagoryRouter);
app.use(newsletter);
app.use(help);
app.use(paymentRouter);
app.use(orederRouter);

app.get("/getkey/", (req, res) => {
    res.status(200).json({ key: "rzp_test_VNWhrgeOoOO1qR" })
})

app.listen(port, () => {
    console.log(`app is listen port ${port}`);
})