import searchSvg from "../assets/search.svg";
import filterSvg from "../assets/filter.svg";
import downArrowSvg from "../assets/arrow.svg";

const Navbar = () => {
  return (
    <div className='bg-gray-100 rounded-xl p-2 mx-6 mt-4 flex items-center justify-between shadow-lg border border-gray-300'>
      {/* search bar */}
      <div className='relative w-1/3'>
        <input
          type='text'
          placeholder='Search Task'
          className='bg-white pl-10 pr-4 py-2 w-full border border-gray-300 rounded-3xl outline-none'
        />
        <img
          src={searchSvg}
          alt='Search icon'
          className='absolute left-3 top-1/2 transform -translate-y-1/2'
        />
      </div>

      {/* filter button */}
      <button className='flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer'>
        <img src={filterSvg} alt='filter icon' className='w-4' />
        <span>Filter</span>

        <img
          src={downArrowSvg}
          alt='dropdown arrow'
          className='w-3 rotate-270'
        />
      </button>
    </div>
  );
};

export default Navbar;
