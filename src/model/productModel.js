const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    productImage: [
        {
            img: {
                type: String,
                required: true
            }
        }
    ],
    productPrice: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productstock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    review: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        name: {
            type: String
        },
        title: {
            type: String
        },
        Opinion: {
            type: String
        },
        rate: {
            type: Number
        },
    }],

}, { timestamps: true })

const product = mongoose.model("product", productSchema);
module.exports = product;