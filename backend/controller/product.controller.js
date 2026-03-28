import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.model.js";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  // ✅ Validation
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, price, and image",
    });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();

    res.status(201).json({
      // ✅ 201 for created resource
      success: true,
      message: "Product created successfully",
      data: newProduct, // ✅ Return saved product, not raw input
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, message: "product updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
