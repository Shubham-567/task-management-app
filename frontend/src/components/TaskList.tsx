import { useContext } from "react";
import { Task, TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const categories = ["To Do", "In Progress", "Done"];

const categoryColors: Record<string, string> = {
  "To Do": "bg-purple-700",
  "In Progress": "bg-orange-500",
  Done: "bg-green-500",
};

const TaskList = () => {
  const { tasks, editTask } = useContext(TaskContext)!;

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    task: Task
  ) => {
    event.dataTransfer.setData("taskId", task._id);
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
    newCategory: string
  ) => {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("taskId");

    const task = tasks.find((task) => task._id === taskId);

    if (task && task.category !== newCategory) {
      await editTask(taskId, {
        category: newCategory as "To Do" | "In Progress" | "Done",
      });
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-fr gap-4 mt-4'>
      {categories.map((category) => (
        <div
          key={category}
          className={`bg-gray-100 dark:bg-dark-background-2 dark:text-white p-4 rounded-xl shadow-lg border border-gray-300 dark:border-dark-border ${
            category === "Done" && "sm:col-span-2 lg:col-span-1"
          }`}
          onDragOver={(event) => event.preventDefault()} // allowing dropping
          onDrop={(event) => handleDrop(event, category)} // handle drop
        >
          <h2 className='text-lg font-semibold flex items-center justify-center'>
            <span
              className={`${categoryColors[category]} h-2 w-2 rounded-full inline-block mr-2 mb-1`}></span>
            {category}
          </h2>

          <hr
            className={`${categoryColors[category]} border-0 h-1 w-full mt-2`}
          />
          {tasks
            .filter(
              (task) =>
                task.category === category || // for normal category
                (task.category === "Timeout" && // for timeout category
                  task.originalCategory === category)
            )
            .map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onDragStart={handleDragStart}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
