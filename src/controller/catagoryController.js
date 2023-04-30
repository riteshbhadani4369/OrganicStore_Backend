const catagory = require("../model/catagoryModel")

const createCatagory = async (req, res) => {
    try {
        const { catagoryname } = req.body;
        const createcatagory = new catagory({
            catagoryname: catagoryname
        })
        const catagorydata = await createcatagory.save()
        res.status(200).send(catagorydata)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getallCatagory = async (req, res) => {

    try {
        const finddata = await catagory.find();
        res.status(200).send(finddata)
    } catch (error) {
        res.status(400).send(error)
    }

}

const deleteCatagory = async (req, res) => {
    try {
        const _id = req.params.id
        const deletecatagory = await catagory.findByIdAndDelete(_id);
        res.status(200).send(deletecatagory)
    } catch (error) {
        res.status(400).send(error)
    }

}
const editCatagory = async (req, res) => {

    try {
        const _id = req.params.id;
        const updatecatagory = await catagory.findByIdAndUpdate(_id, req.body, { new: true })

        res.status(200).send(updatecatagory)
    } catch (error) {
        res.status(400).send(error)
    }

}

const getsinglecatagory = async (req, res) => {
    try {
        const _id = req.params.id;

        const singlecatagory = await catagory.findById(_id)
        res.status(200).send(singlecatagory)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { createCatagory, getallCatagory, deleteCatagory, editCatagory, getsinglecatagory }