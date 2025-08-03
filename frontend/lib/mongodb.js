import mongoose from "mongoose";

let isConnected = false; // Track connection

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) throw new Error("Please define MONGODB_URI in Vercel env vars.");

  try {
    await mongoose.connect(uri, { dbName: "SecondHandStore" });
    isConnected = true;
    console.log("MongoDB Connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
