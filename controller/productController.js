const Product = require("../model/productModel");

const getallProducts = async (req, res) => {
    try{
        const products = await Product.find();

        if(products.length === 0){
            return res.status(200).json({message: "Product Collection Empty"});
        }
        res.status(200).json({count: products.length, data: products});
    }catch(err){
        res.status(500).json({message: "Server Error"});
    }
};

const getproductById = async (req, res) => {
    const { id } = req.params;
    try{
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(product);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: "Server Error"});
    }
};

const createProduct = async (req, res) => {
    const {title, description, price} = req.body;

    try{
        const newProduct = new Product({title, description, price,});
        await newProduct.save();
        res.status(201).json(newProduct);
    }catch(err){
        res.status(500).json({message: "Server Error"});
    }
};

const editProduct = async (req, res) => {
    const { id } = req.params;

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({message: "Product data updated"});
    }catch(err){
        res.status(500).json({message: "Server Error"});
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(204).json({message: "Product Deleted"});
    }catch(err){
        res.status(500).json({message: "Server Error"});
    }
}

module.exports = {getallProducts, getproductById, createProduct, editProduct, deleteProduct};