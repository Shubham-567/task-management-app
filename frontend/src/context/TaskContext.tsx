import { createContext, useState, useEffect, ReactNode } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api/taskApi";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  category: "To Do" | "In Progress" | "Done" | "Timeout";
  originalCategory?: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  expiresAt: string;
}

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: Omit<Task, "_id">) => Promise<void>;
  editTask: (id: string, updateTask: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log("Error fetching tasks: ", error);
    }
  };

  const addTask = async (task: Omit<Task, "_id">) => {
    try {
      await createTask(task);
      fetchTasks(); // refresh task
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  };

  const editTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      await updateTask(id, updatedTask);
      fetchTasks(); // refresh task
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
