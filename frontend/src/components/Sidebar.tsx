import { useContext } from "react";

import expireSvg from "../assets/expire.svg";
import activeSvg from "../assets/activeTask.svg";
import completeSvg from "../assets/completedTask.svg";
import { TaskContext } from "../context/TaskContext";

const Sidebar = ({ onAddTask }: { onAddTask: () => void }) => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) return null;

  const { tasks } = taskContext;

  const expiredTasks = tasks.filter(
    (task) => task.category === "Timeout"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.category === "Done"
  ).length;

  const activeTasks = tasks.length - completedTasks;

  return (
    <div className='lg:w-1/5'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row lg:flex-col lg:mt-4 dark:text-white'>
        <div className='bg-gray-100 dark:bg-dark-background-2 min-h-24 p-4 rounded-xl shadow-lg border border-gray-300 dark:border-dark-border sm:w-full'>
          <img
            className='w-10 mb-4'
            src={expireSvg}
            alt='red icon with clock indicating time has expired'
          />
          <p className='text-md mb-2'>Expired Tasks</p>
          <p className='text-3xl font-semibold'>{expiredTasks}</p>
        </div>

        <div className='bg-gray-100 dark:bg-dark-background-2 min-h-24 p-4 rounded-xl shadow-lg border border-gray-300 dark:border-dark-border sm:w-full'>
          <img
            className='w-10 mb-4'
            src={activeSvg}
            alt='orange icon with suitcase'
          />
          <p className='text-sm'>All Active Tasks</p>
          <p className='text-3xl font-semibold'>{activeTasks}</p>
        </div>

        <div className='bg-gray-100 dark:bg-dark-background-2 min-h-24 p-4 rounded-xl shadow-lg border border-gray-300 dark:border-dark-border sm:w-full'>
          <img
            className='w-10 mb-4'
            src={completeSvg}
            alt='light blue icon with clock'
          />
          <p className='text-sm'>Completed Tasks</p>
          <p className='text-3xl font-semibold'>
            {completedTasks}/<span className='text-xl'>{tasks.length}</span>
          </p>
        </div>
      </div>
      <button
        className='w-full mt-4 bg-black dark:bg-zinc-700 text-white  px-4 py-2 text-sm rounded-xl shadow-lg cursor-pointer'
        onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
};

export default Sidebar;
