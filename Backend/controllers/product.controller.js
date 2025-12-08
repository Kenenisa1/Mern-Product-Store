import Product from "../models/product.model.js";
import mongoose from 'mongoose'

export const getProducts = async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products})
  }
  catch (err) {
    console.log("Get Products Error: ", err)
    res
    .status(500).json({ success: false, message: "Server Error"});
  }
}

export const createProduct =  async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
        // Handle Mongoose Validation Errors (400)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
        // Handle all other server errors (500)
        console.error("Create Product Server Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message : "Product not found"})
  }
  try {
    const DeleteProduct=  await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({success:  false, message: "Server Error"});
  }
}

export const updateProduct = async (req, res) => {
  const {id} = req.params;
  
  const product = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({success: false, message: "Invalid product ID"});
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product,{new: true});
    res.status(200).json({success: true, data: updatedProduct})
  }

  catch  {
    res.status(500).json({success: false, message: "Server Error"})
  }
}