import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const categories = ["To Do", "In Progress", "Done"];

const TaskList = () => {
  const { tasks } = useContext(TaskContext)!;

  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {categories.map((category) => (
        <div key={category} className='bg-gray-100 p-4 rounded-md'>
          <h2 className='text-lg text-center font-semibold'>{category}</h2>

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
