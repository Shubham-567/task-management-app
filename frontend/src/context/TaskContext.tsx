import { createContext, useState, useEffect, ReactNode } from "react";
import { getTasks } from "../api/taskApi";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  category: "To Do" | "In Progress" | "Done";
  priority: "Low" | "High";
  expiresAt: string;
}

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
