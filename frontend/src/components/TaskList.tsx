import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const categories = ["To Do", "In Progress", "Done"];

const categoryColors: Record<string, string> = {
  "To Do": "bg-purple-700",
  "In Progress": "bg-orange-500",
  Done: "bg-green-500",
};

const TaskList = () => {
  const { tasks } = useContext(TaskContext)!;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-fr gap-4 mt-4'>
      {categories.map((category) => (
        <div
          key={category}
          className={`bg-gray-100 p-4 rounded-xl shadow-lg border border-gray-300 ${
            category === "Done" && "sm:col-span-2 lg:col-span-1"
          }`}>
          <h2 className='text-lg font-semibold flex items-center justify-center'>
            <span
              className={`${categoryColors[category]} h-2 w-2 rounded-full inline-block mr-2 mb-1`}></span>
            {category}
          </h2>

          <hr
            className={`${categoryColors[category]} border-0 h-1 w-full mt-2`}
          />
          {tasks
            .filter((task) => task.category === category)
            .map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
