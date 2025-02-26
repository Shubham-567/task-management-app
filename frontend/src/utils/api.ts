const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);

  return response.json();
};
