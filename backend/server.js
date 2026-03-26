import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.model.js";

dotenv.config();

const app = express();

// ✅ Middleware to read JSON
app.use(express.json());

// ✅ GET all products
app.get("/products", async (req, res) => {
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
});

// ✅ POST create product
app.post("/api/products", async (req, res) => {
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
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "product not found" });
  }
});

const PORT = process.env.PORT;

// ✅ Start server AFTER defining routes
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB(); // ✅ Connect to DB after server starts
});
