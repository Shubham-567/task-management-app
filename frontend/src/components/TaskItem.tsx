import { Task } from "../context/TaskContext";

const TaskItem = ({ task }: { task: Task }) => {
  const deadline = new Date(task.expiresAt).toLocaleDateString("en-GB");

  return (
    <div className='bg-white shadow-md p-4 rounded-lg mt-2 min-h-42'>
      <div className='text-xs text-red-600 bg-red-100 inline px-2 py-1 rounded-md'>
        {task.priority}
      </div>
      <h3 className='text-xl font-bold mt-1'>{task.title}</h3>
      <p className='text-gray-600 text-sm'>{task.description}</p>
      <p className='text-xs mt-1'>
        Deadline: <span className='text-gray-400'>{deadline}</span>
      </p>
    </div>
  );
};

export default TaskItem;
