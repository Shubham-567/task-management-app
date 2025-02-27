import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";

import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className='flex p-6'>
        <Sidebar />
        <div className='flex-1 p-6'>
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
