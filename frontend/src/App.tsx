import { useState, useEffect } from "react";
import { fetchTasks } from "./utils/api";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  return (
    <div>
      <h1>Task Management App</h1>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
