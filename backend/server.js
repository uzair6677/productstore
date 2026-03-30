import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use("/api/products", productRoutes);

// Development route
if (process.env.NODE_ENV !== "production") {
  app.get("/", (req, res) => {
    res.json({
      message: "API is running",
      endpoints: ["/api/products"],
    });
  });
}

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, async () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`,
  );
  await connectDB();
});
