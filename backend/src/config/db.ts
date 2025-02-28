import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_DB_URL;

const connectDB = async () => {
  if (!MONGO_URL) {
    console.error("MongoDB URI is not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDb connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
