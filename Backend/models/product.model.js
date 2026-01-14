import mongoose from "mongoose";

/**
 * Product Database Schema
 * Defines the structure and validation for product documents
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      default: "",
      maxLength: [500, "Description cannot exceed 500 characters"],
    },
    category: {
      type: String,
      default: "other",
      enum: ["electronics", "clothing", "books", "home", "other"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Database indexes for optimized queries
productSchema.index({ name: "text", description: "text" }); // Text search
productSchema.index({ category: 1 }); // Category filtering
productSchema.index({ createdAt: -1 }); // Recent products
productSchema.index({ price: 1 }); // Price sorting

const Product = mongoose.model("Product", productSchema);

export default Product;
