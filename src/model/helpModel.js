const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    textMessage: {
        type: String,
        required: true
    }
})

const contact = mongoose.model("Help", contactSchema);

module.exports = contact;