import { setServers } from "node:dns/promises";
import mongoose from "mongoose";
setServers(["1.1.1.1", "8.8.8.8"]);
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      family: 4, // Forces IPv4
    });

    console.log("mongodb connected successfully");
  } catch (error) {
    console.error("mongodb connection failed", error);
    process.exit(1);
  }
};
