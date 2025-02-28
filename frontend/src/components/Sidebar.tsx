import expireSvg from "../assets/expire.svg";
import activeSvg from "../assets/activeTask.svg";
import completeSvg from "../assets/completedTask.svg";

const Sidebar = ({ onAddTask }: { onAddTask: () => void }) => {
  return (
    <div className='w-1/5 py-4'>
      <div className='mb-4 bg-gray-100 min-h-24 p-4 rounded-xl'>
        <img
          className='w-10 mb-4'
          src={expireSvg}
          alt='red icon with clock indicating time has expired'
        />
        <p className='text-md text-gray-500 mb-2'>Expired Tasks</p>
        <p className='text-3xl font-semibold'>5</p>
      </div>

      <div className='mb-4 bg-gray-100 min-h-24 p-4 rounded-xl'>
        <img
          className='w-10 mb-4'
          src={activeSvg}
          alt='orange icon with suitcase'
        />
        <p className='text-sm'>All Active Tasks</p>
        <p className='text-3xl font-semibold'>7</p>
      </div>

      <div className='mb-4 bg-gray-100 min-h-24 p-4 rounded-xl'>
        <img
          className='w-10 mb-4'
          src={completeSvg}
          alt='light blue icon with clock'
        />
        <p className='text-sm'>Completed Tasks</p>
        <p className='text-3xl font-semibold'>
          2/<span className='text-2xl'>7</span>
        </p>
      </div>

      <button
        className='w-full mt-4 bg-black text-white px-4 py-2 text-sm rounded-xl'
        onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
};

export default Sidebar;
