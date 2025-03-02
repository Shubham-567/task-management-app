import { useState, useEffect } from "react";

import searchSvg from "../assets/search.svg";
import filterSvg from "../assets/filter.svg";
import sunSvg from "../assets/sun.svg";
import moonSvg from "../assets/moon.svg";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className='bg-gray-100 dark:bg-dark-background-2 rounded-xl p-2 flex items-center justify-between shadow-lg border border-gray-300 dark:border-dark-border'>
      {/* search bar */}
      <div className='relative w-2/3 lg:w-1/3 mr-4 min-w-[110px]'>
        <input
          type='text'
          placeholder='Search Task'
          className='bg-white dark:bg-dark-background dark:text-white pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-dark-border rounded-3xl outline-none'
        />
        <img
          src={searchSvg}
          alt='Search icon'
          className='absolute left-3 top-1/2 transform -translate-y-1/2 dark:invert'
        />
      </div>

      <div className='flex gap-2'>
        {/* filter button */}
        <button className='flex items-center gap-2 bg-white dark:bg-dark-background dark:text-white border border-gray-300 dark:border-dark-border px-4 py-2 rounded-md shadow-sm hover:bg- cursor-pointer min-w-[100px]'>
          <img src={filterSvg} alt='filter icon' className='w-4 dark:invert' />
          <span>Filter</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className='p-2 w-10 h-10 border border-gray-300 dark:border-dark-border dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'>
          {darkMode ? (
            <img className='w-5 h-5 mx-auto' src={sunSvg} alt='Sun Icon' />
          ) : (
            <img className='w-5 h-5 mx-auto' src={moonSvg} alt='Moon Icon' />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
