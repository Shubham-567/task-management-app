import { Request, Response } from "express";
import Task, { ITask } from "../models/taskModel";

// get all tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// get single task by id
export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.params.id) {
    res.status(400).json({ message: "Task id is required" });
    return;
  }

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

// create new task
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, expiresAt } = req.body;

    if (!title || !expiresAt) {
      res.status(400).json({ message: "Title and Expiry Date required" });
      return;
    }

    const newTask: ITask = new Task({ title, description, expiresAt });

    await newTask.save();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// update task

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.params.id) {
    res.status(400).json({ message: "Task id is required" });
    return;
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // schema validation enum check
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task: ", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// delete task
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.params.id) {
    res.status(400).json({ message: "Task id is required" });
    return;
  }

  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
