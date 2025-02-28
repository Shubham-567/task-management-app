import { useState } from "react";

import closeSvg from "../assets/close.svg";

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center'>
      <div className='relative bg-white p-6 rounded-xl w-96'>
        <h2 className='text-xl font-bold mb-4'>Add Task</h2>

        <hr className='mb-2 border-gray-400' />

        <div className='px-1 pt-2'>
          <input
            type='text'
            placeholder='Title'
            className='w-full p-2 border-b mb-2 border-gray-800 mb-2'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder='Description'
            className='w-full p-2 border border-gray-200 rounded mb-2'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
          />

          <div className='flex justify-between'>
            <button className='bg-gray-200 text-black px-4 py-2 rounded-xl'>
              Deadline
            </button>
            <button className='bg-gray-200 text-black px-4 py-2 rounded-xl'>
              Add
            </button>
          </div>
        </div>

        <img
          src={closeSvg}
          alt='Close icon'
          className='absolute top-4 right-4 w-7'
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default AddTaskModal;
