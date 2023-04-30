const mongoose = require("mongoose")

const newsSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

const news = mongoose.model("Newsletter", newsSchema);

module.exports = news