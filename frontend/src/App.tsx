import TaskList from "./components/TaskList";

import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div>
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
