import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  title: string;
  description?: string;
  category: "To Do" | "In Progress" | "Done" | "Timeout";
  priority: "Low" | "Medium" | "High";
  createdAt: Date;
  expiresAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ["To Do", "In Progress", "Done", "Timeout"],
    default: "To Do",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },

  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
