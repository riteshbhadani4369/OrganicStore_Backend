const product = require("../model/productModel");


const createproduct = async (req, res) => {

    try {

        const { productName, productPrice, productDescription, productstock, category } = req.body;

        let productImage = [];
        if (req.files.length > 0) {
            productImage = req.files.map(file => {
                return { img: file.filename }
            })
        }


        const create = new product({
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productImage: productImage,
            productstock: productstock,
            category: category
        })

        const productdata = await create.save();
        res.status(200).send(productdata);

    } catch (error) {
        res.status(402).send(error);
        console.log("createproduct error");
    }

}

const getAllproduct = async (req, res) => {

    try {
        const finddata = await product.find();
        res.status(200).send(finddata)
    } catch (error) {
        res.status(400).send(error)
    }

}

const getsingleproduct = async (req, res) => {
    try {
        const findsingledata = await product.findById(req.params.id);
        res.status(200).send(findsingledata);
    } catch (error) {
        res.status(401).send(error)
    }
}


const updateproduct = async (req, res) => {
    try {
        const _id = req.params.id;
        // console.log(_id);
        const updateProduct = await product.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(201).send(updateProduct);
    } catch (error) {
        res.status(401).send(error.message);
    }
}

const deleteproduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteproduct = await product.findByIdAndDelete(_id)
        res.status(201).send(deleteproduct)
    } catch (error) {
        res.status(401).send(error)
    }
}


module.exports = { createproduct, getAllproduct, getsingleproduct, updateproduct, deleteproduct }