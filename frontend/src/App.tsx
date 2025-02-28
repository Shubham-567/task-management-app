import { useState } from "react";

import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";

import { TaskProvider } from "./context/TaskContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TaskProvider>
      <div className='flex px-6'>
        <Sidebar onAddTask={() => setIsModalOpen(true)} />
        <div className='flex-1 px-6'>
          <TaskList />
        </div>

        {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </TaskProvider>
  );
}

export default App;
