import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  title: string;
  description?: string;
  category: "To Do" | "In Progress" | "Done" | "Timeout";
  createdAt: Date;
  expiresAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ["To Do", "In Progress", "Demo", "Timeout"],
    default: "To Do",
  },

  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
