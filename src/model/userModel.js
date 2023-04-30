const mongoose = require("mongoose")
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    }
})

userSchema.methods.generatToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, "generatToken");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error.message);
    }
};

const user = mongoose.model("user", userSchema);

module.exports = user;