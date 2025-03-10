import React from "react";
import checkboxSvg from "../assets/checkbox.svg";

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-20'>
      <div className='bg-white dark:bg-dark-background-2 dark:text-white p-6 rounded-lg shadow-lg text-center w-80 flex justify-center items-center flex-col'>
        <img
          src={checkboxSvg}
          alt='black checkbox icon'
          className='dark:invert'
        />
        <p className='text-lg font-medium mb-4 mt-2'>{message}</p>
        <button
          className='bg-black dark:bg-zinc-600 text-white px-4 py-2 w-full rounded-md'
          onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
