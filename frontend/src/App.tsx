import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";

import { TaskProvider } from "./context/TaskContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='px-6 py-3 min-w-[300px]'>
      <TaskProvider>
        <Navbar />
        <div className='flex flex-col-reverse gap-4 lg:flex-row '>
          <Sidebar onAddTask={() => setIsModalOpen(true)} />
          <div className='flex-1'>
            <TaskList />
          </div>

          {isModalOpen && (
            <AddTaskModal onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      </TaskProvider>
    </div>
  );
}

export default App;
