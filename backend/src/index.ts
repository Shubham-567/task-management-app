import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../src/config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task management api is running...");
});

connectDB();

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
