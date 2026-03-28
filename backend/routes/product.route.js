import express from "express";
import mongoose from "mongoose";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controller/product.controller.js";
import Product from "../models/Product.model.js";
const router = express.Router();

// ✅ GET all products
router.get("/", getProducts);

// ✅ POST create product
router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
