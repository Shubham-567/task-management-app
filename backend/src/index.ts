import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";
import { checkAndMoveTimeoutTasks } from "./services/taskService";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

let intervalSet = false;

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

const startServer = async () => {
  try {
    await connectDB();

    if (!intervalSet) {
      setInterval(checkAndMoveTimeoutTasks, 60000); // run in every 1 minute
      intervalSet = true;
    }

    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    console.error("Failed to connect the database", error);
    process.exit(1); // stop process if connection failed
  }
};

startServer();
