import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoose connected");
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
