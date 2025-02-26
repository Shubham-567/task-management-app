import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/taskdb";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDb connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
