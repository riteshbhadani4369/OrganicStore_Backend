const mongoose = require("mongoose");

const catagorySchema = mongoose.Schema({
    catagoryname: {
        type: String,
        required: true,
        unique: true
    }
})

const catagory = mongoose.model("catagory", catagorySchema);
module.exports = catagory