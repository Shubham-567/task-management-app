import { Task, TaskContext } from "../context/TaskContext";
import optionSvg from "../assets/ellipsis-vertical.svg";
import { useEffect, useRef, useState, useContext } from "react";
import AddTaskModal from "./AddTaskModal";

const priorityColors: Record<string, string> = {
  Low: "text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900",
  Medium:
    "text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900",
  High: "text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900",
  Completed:
    "text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900",
};

const TaskItem = ({
  task,
  onDragStart,
}: {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
}) => {
  const deadline = new Date(task.expiresAt).toLocaleDateString("en-GB");

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const taskContext = useContext(TaskContext);

  // in case this component is not part of taskProvider
  if (!taskContext) {
    console.error("Task Context is undefined");
    return null;
  }

  const { removeTask } = taskContext;

  // close menu when clicked outside of menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want ot delete this task"
    );
    try {
      if (confirmDelete) {
        await removeTask(task._id);
        alert("Task has been deleted successfully");
      }
    } catch (error) {
      console.error("Error while deleting a task: ", error);
      alert("Error while deleting a task");
    }
  };

  return (
    <>
      <div
        className={`bg-white dark:bg-dark-background shadow-md p-4 rounded-xl mt-4 min-h-42 flex flex-col justify-between border border-gray-300 dark:border-dark-border transition-transform duration-200 cursor-grab ${
          isDragging ? "opacity-50 scale-105 shadow-lg" : ""
        }`}
        draggable
        onDragStart={(event) => {
          setIsDragging(true);
          onDragStart(event, task);
        }}
        onDragEnd={() => setIsDragging(false)}>
        <div>
          <div className='flex justify-between items-center'>
            <div
              className={`text-xs inline px-2 py-1 rounded-md  ${
                priorityColors[task.priority] || "text-gray-600 bg-gray-100"
              }`}>
              {task.priority}
            </div>

            <div className='relative' ref={menuRef}>
              <button
                onClick={() => setMenuOpen(true)}
                className='z-5 cursor-pointer'>
                <img
                  src={optionSvg}
                  alt='task options'
                  className='max-h-5 dark:invert'
                />
              </button>

              {menuOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-gray-100 dark:bg-dark-background-2 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-10'>
                  <ul className='py-2'>
                    <li
                      className='px-4 py-2 hover:bg-gray-200 dark:hover:bg-dark-background cursor-pointer'
                      onClick={() => {
                        setIsEditing(true);
                        setMenuOpen(false);
                      }}>
                      Edit Task
                    </li>

                    <li
                      className='px-4 py-2 hover:bg-gray-200 dark:hover:bg-dark-background cursor-pointer'
                      onClick={handleDelete}>
                      Delete Task
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <h3 className='text-xl font-bold mt-1'>{task.title}</h3>
          <p className='text-gray-600 dark:text-zinc-400 text-sm'>
            {task.description}
          </p>
        </div>
        <p className='text-xs mt-1 flex justify-between items-center'>
          <span>
            Deadline: <span className='text-zinc-400'>{deadline} </span>
          </span>
          <span className='text-red-500 font-bold'>
            {task.category === "Timeout" && "Expired"}
          </span>
        </p>
      </div>

      {/* edit task modal */}

      {isEditing && (
        <AddTaskModal onClose={() => setIsEditing(false)} existingTask={task} />
      )}
    </>
  );
};

export default TaskItem;
