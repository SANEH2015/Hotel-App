import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaClipboardList, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation(); // To highlight the active link

  return (
    <div className="fixed left-0 top-0 h-full bg-gray-800 text-white w-64 p-4 shadow-lg mt-4"> {/* Added mt-4 here */}
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      </div>

      <nav className="flex flex-col space-y-6">
        {/* Home Link */}
        <Link
          to="/LandingPage"
          aria-label="Home"
          className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ease-in-out ${
            location.pathname === '/adminHome' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
          }`}
        >
          <FaHome size={20} />
          <span className="text-lg">Home</span>
        </Link>

        {/* Post Accommodation Link */}
        <Link
          to="/AdminPostForm"
          aria-label="Post Accommodation"
          className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ease-in-out ${
            location.pathname === '/adminPostForm' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
          }`}
        >
          <FaPlusCircle size={20} />
          <span className="text-lg">Post Accommodation</span>
        </Link>

        {/* Manage Accommodations Link */}
        <Link
          to="/AdminAccommodations"
          aria-label="Manage Accommodations"
          className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ease-in-out ${
            location.pathname === '/AdminAccommodations' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
          }`}
        >
          <FaClipboardList size={20} />
          <span className="text-lg">Manage Accommodations</span>
        </Link>

        {/* Logout Link */}
        <Link
          to="/LandingPage"
          aria-label="Logout"
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out"
        >
          <FaSignOutAlt size={20} />
          <span className="text-lg">Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
