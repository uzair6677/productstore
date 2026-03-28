import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import Product from "./models/Product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// ✅ Middleware to read JSON
app.use(express.json());
app.use("/api/products", productRoutes); // ✅ Use product routes

const PORT = process.env.PORT;

// ✅ Start server AFTER defining routes
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB(); // ✅ Connect to DB after server starts
});
