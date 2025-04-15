
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error.message);
//     process.exit(1); // Stop the app if DB connection fails
//   }
// };

// module.exports = connectDB;

// backend/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
