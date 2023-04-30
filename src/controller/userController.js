const user = require("../model/userModel")
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {

    try {

        const { name, email, password, mobileno } = req.body;

        const register = new user({
            name: name,
            email: email,
            password: password,
            mobileno: mobileno
        })
        register.password = await bcrypt.hash(register.password, 10);
        const userdata = await register.save();
        res.status(200).send(userdata);
    } catch (error) {
        res.status(400).send(error);
    }

};

const userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await user.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {
            const token = await userData.generatToken();
            res.status(201).send(userData);
        }
        else {
            res.status(400).send("password is not valid")
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const getAllUser = async (req, res) => {

    try {
        const finddata = await user.find();
        res.status(200).send(finddata)
    } catch (error) {
        res.status(400).send(error)
    }

}

const userDelete = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteuser = await user.findByIdAndDelete(_id)
        res.status(201).send(deleteuser)
    } catch (error) {
        res.status(401).send(error)
    }
}



module.exports = { userRegister, userLogin, getAllUser, userDelete }