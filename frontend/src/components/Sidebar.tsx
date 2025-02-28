import { useContext } from "react";

import expireSvg from "../assets/expire.svg";
import activeSvg from "../assets/activeTask.svg";
import completeSvg from "../assets/completedTask.svg";
import { TaskContext } from "../context/TaskContext";

const Sidebar = ({ onAddTask }: { onAddTask: () => void }) => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) return null;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // reset to start of day

  const { tasks } = taskContext;

  const expiredTasks = tasks.filter(
    (task) => new Date(task.expiresAt) < currentDate
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.category === "Done"
  ).length;

  const activeTasks = tasks.length - completedTasks;

  return (
    <div className='w-1/5 py-4'>
      <div className='mb-4 bg-gray-100 min-h-24 p-4 rounded-xl'>
        <img
          className='w-10 mb-4'
          src={expireSvg}
          alt='red icon with clock indicating time has expired'
        />
        <p className='text-md text-gray-500 mb-2'>Expired Tasks</p>
        <p className='text-3xl font-semibold'>{expiredTasks}</p>
      </div>

      <div className='mb-4 bg-gray-100 min-h-24 p-4 rounded-xl'>
        <img
          className='w-10 mb-4'
          src={activeSvg}
          alt='orange icon with suitcase'
        />
        <p className='text-sm'>All Active Tasks</p>
        <p className='text-3xl font-semibold'>{activeTasks}</p>
      </div>

      <div className='mb-4 bg-gray-100 min-h-24 p-4 rounded-xl'>
        <img
          className='w-10 mb-4'
          src={completeSvg}
          alt='light blue icon with clock'
        />
        <p className='text-sm'>Completed Tasks</p>
        <p className='text-3xl font-semibold'>
          {completedTasks}/<span className='text-2xl'>{tasks.length}</span>
        </p>
      </div>

      <button
        className='w-full mt-4 bg-black text-white px-4 py-2 text-sm rounded-xl'
        onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
};

export default Sidebar;
