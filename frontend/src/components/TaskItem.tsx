import { Task } from "../context/TaskContext";

const priorityColors: Record<string, string> = {
  Low: "text-green-600 bg-green-100",
  Medium: "text-yellow-600 bg-yellow-100",
  High: "text-red-600 bg-red-100",
  Completed: "text-green-600 bg-green-100",
};

const TaskItem = ({ task }: { task: Task }) => {
  const deadline = new Date(task.expiresAt).toLocaleDateString("en-GB");

  return (
    <div className='bg-white shadow-md p-4 rounded-xl mt-4 min-h-42 flex flex-col justify-between border border-gray-300'>
      <div>
        <div
          className={`text-xs inline px-2 py-1 rounded-md  ${
            priorityColors[task.priority] || "text-gray-600 bg-gray-100"
          }`}>
          {task.priority}
        </div>
        <h3 className='text-xl font-bold mt-1'>{task.title}</h3>
        <p className='text-gray-600 text-sm'>{task.description}</p>
      </div>
      <p className='text-xs mt-1'>
        Deadline: <span className='text-gray-400'>{deadline}</span>
      </p>
    </div>
  );
};

export default TaskItem;
