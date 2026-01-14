import Product from "../models/product.model.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import multer from "multer";

// ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const createUploadsDir = async () => {
  try {
    await fs.access("uploads");
  } catch (error) {
    await fs.mkdir("uploads", { recursive: true });
  }
};
createUploadsDir();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB maximum
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
});

// Fetch all products with pagination
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    let query = {};
    if (category && category !== "all") {
      query.category = category;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: products,
    });
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error retrieving products",
    });
  }
};

// Fetch featured products (homepage display)
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(6);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.error("Get Featured Products Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error retrieving featured products",
    });
  }
};

// Fetch single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("Get Product By ID Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error retrieving product",
    });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Product name, price, and image are required",
      });
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number",
      });
    }

    // Store relative image path
    const imageUrl = `/uploads/${req.file.filename}`;

    const product = new Product({
      name,
      price: priceNum,
      description: description || "",
      category: category || "other",
      image: imageUrl,
      user: req.user?._id || null,
    });

    const createdProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: createdProduct,
    });
  } catch (error) {
    console.error("Create product error:", error);

    // Cleanup failed upload
    if (req.file) {
      try {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads",
          req.file.filename
        );
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error("Failed to cleanup uploaded file:", unlinkError);
      }
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error creating product",
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Remove associated image file
    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error("Failed to delete image file:", error);
      }
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error deleting product",
    });
  }
};

// Update existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updateData = { name, description, category };

    if (price !== undefined) {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum < 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be a valid positive number",
        });
      }
      updateData.price = priceNum;
    }

    // Handle image update
    if (req.file) {
      // Remove old image
      if (existingProduct.image) {
        const oldImagePath = path.join(__dirname, "..", existingProduct.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.error("Failed to delete old image:", error);
        }
      }

      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Update Product Error:", err);

    // Cleanup newly uploaded file on failure
    if (req.file) {
      try {
        await fs.unlink(
          path.join(__dirname, "..", "uploads", req.file.filename)
        );
      } catch (unlinkError) {
        console.error("Failed to cleanup uploaded file:", unlinkError);
      }
    }

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error updating product",
    });
  }
};
