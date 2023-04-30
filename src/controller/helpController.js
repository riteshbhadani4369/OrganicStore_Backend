const help1 = require("../model/helpModel")

const help = async (req, res) => {
    try {
        const { mobileno, name, email, textMessage } = req.body;

        const contact = new help1({
            name: name,
            email: email,
            mobileno: mobileno,
            textMessage: textMessage
        })
        const contactdata = await contact.save();
        res.status(200).send(contactdata)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { help }