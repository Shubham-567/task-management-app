import { useState, useContext } from "react";
import closeSvg from "../assets/close.svg";
import CalendarModal from "./CalendarModal";
import SuccessModal from "./SuccessModal";
import { Task, TaskContext } from "../context/TaskContext";

const AddTaskModal = ({
  onClose,
  existingTask,
}: {
  onClose: () => void;
  existingTask?: Task;
}) => {
  const taskContext = useContext(TaskContext);

  // in case this component is not part of taskProvider
  if (!taskContext) {
    console.error("Task Context is undefined");
    return null;
  }

  const { addTask, editTask } = taskContext;

  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(
    existingTask?.description || ""
  );
  const [deadline, setDeadline] = useState<Date | null>(
    existingTask ? new Date(existingTask.expiresAt) : null
  );

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // dd/mm/yyy
  const formatDate = (date: Date): string => {
    return new Date(date).toISOString().split("T")[0];
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

    try {
      if (existingTask) {
        await editTask(existingTask._id, {
          title,
          description: description.trim() || undefined,
          expiresAt: formatDate(deadline),
        });
      } else {
        await addTask({
          title,
          description: description.trim() || undefined,
          expiresAt: formatDate(deadline),
          category: "To Do", // Default category
          priority: "Medium", // Default priority
        });
      }

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
      <div className='fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-10'>
        <div className='relative bg-white dark:bg-dark-background-2 dark:text-white p-6 rounded-xl w-96'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold mb-4 flex items-center'>
              <span className='bg-sky-500 h-2 w-2 rounded-full inline-block mr-2 mb-1'></span>
              {existingTask ? "EDIT TASK" : "ADD TASK"}
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
                className='bg-gray-200 dark:bg-zinc-700 text-black dark:text-white px-4 py-2 rounded-xl'
                onClick={() => setShowDatepicker(true)}>
                {deadline
                  ? `Deadline: ${formatDate(deadline)}`
                  : "Select Deadline"}
              </button>
              <button
                className='bg-gray-200 dark:bg-zinc-700 text-black dark:text-white px-4 py-2 rounded-xl'
                onClick={handleAddTask}>
                {existingTask ? "Update" : "Add"}
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
        <SuccessModal
          message={
            existingTask
              ? "Task has been Updated Successfully"
              : "New task has been created Successfully"
          }
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default AddTaskModal;
