import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.send("server is ready");
});

app.listen(7000, () => {
  console.log("server is running on port 7000");
  connectDB();
});
