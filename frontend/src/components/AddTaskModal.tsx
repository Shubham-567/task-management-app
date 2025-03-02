import { useState, useContext } from "react";
import closeSvg from "../assets/close.svg";
import checkboxSvg from "../assets/checkbox.svg";
import CalendarModal from "./CalendarModal";
import { TaskContext } from "../context/TaskContext";
import { createTask } from "../api/taskApi";

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  const { fetchTasks } = useContext(TaskContext) || {};

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // dd/mm/yyy
  const formatDate = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleAddTask = async () => {
    if (!title.trim() || !deadline) {
      alert("Title and Deadline are required!");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset time to midnight
    if (deadline < today) {
      alert("Deadline must be in the future");
      return;
    }

    const newTask = {
      title,
      description: description.trim() || undefined,
      expiresAt: formatDate(deadline),
    };

    try {
      await createTask(newTask);
      fetchTasks && fetchTasks(); // refresh task list

      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleClose = () => {
    setShowSuccessMessage(false);
    onClose();
  };

  return (
    <>
      <div className='fixed inset-0 bg-black/40 flex justify-center items-center p-6'>
        <div className='relative bg-white dark:bg-dark-background-2 dark:text-white p-6 rounded-xl w-96'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold mb-4 flex items-center'>
              <span className='bg-sky-500 h-2 w-2 rounded-full inline-block mr-2 mb-1'></span>
              ADD TASK
            </h2>
          </div>

          <hr className='mb-2 border-gray-400 dark:border-dark-border' />

          <div className='px-1 pt-2'>
            <input
              type='text'
              placeholder='Title'
              className='w-full p-2 border-b mb-2 border-black dark:border-dark-border outline-none'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder='Description'
              className='w-full p-2 border border-gray-200 dark:border-dark-border rounded mb-2 outline-none'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
            />

            <div className='flex justify-between'>
              <button
                className='bg-gray-200 dark:bg-zinc-700 text-black dark:text-white       px-4 py-2 rounded-xl'
                onClick={() => setShowDatepicker(true)}>
                {deadline
                  ? `Deadline: ${formatDate(deadline)}`
                  : "Select Deadline"}
              </button>
              <button
                className='bg-gray-200 dark:bg-zinc-700 text-black dark:text-white       px-4 py-2 rounded-xl'
                onClick={handleAddTask}>
                Add
              </button>
            </div>
          </div>

          <img
            src={closeSvg}
            alt='Close icon'
            className='absolute top-4 right-4 w-7 cursor-pointer dark:invert'
            onClick={onClose}
          />
        </div>

        {/* Calendar */}
        {showDatepicker && (
          <CalendarModal
            onSelectDate={(date) => {
              setDeadline(date);
              setShowDatepicker(false);
            }}
            onClose={() => setShowDatepicker(false)}
          />
        )}
      </div>

      {/* Add Task Success  */}
      {showSuccessMessage && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className='bg-white dark:bg-dark-background-2 dark:text-white p-6 rounded-lg shadow-lg text-center w-80 flex justify-center items-center flex-col'>
            <img
              src={checkboxSvg}
              alt='black checkbox icon'
              className='dark:invert'
            />
            <p className='text-lg font-medium mb-4 mt-2'>
              New task has been created Successfully
            </p>
            <button
              className='bg-black dark:bg-zinc-600 text-white px-4 py-2 w-full rounded-md'
              onClick={handleClose}>
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskModal;
