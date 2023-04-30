const news = require("../model/NewsModel")

const userNews = async (req, res) => {

    try {

        const { email } = req.body
        const newslatter = new news({
            email: email
        })

        const newdata = await newslatter.save()
        res.status(200).send(newdata)
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports = { userNews }