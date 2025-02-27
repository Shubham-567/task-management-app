import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/tasks";

export const getTask = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTask = async (task: {
  title: string;
  expiresAt: string;
}) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id: string, task: any) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
