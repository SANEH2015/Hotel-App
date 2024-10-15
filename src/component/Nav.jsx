import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  // Function to determine the active link
  const isActive = (path) => location.pathname === path ? "text-yellow-500 font-bold" : "text-blue-600";

  return (
    <div>
      {/* Responsive Breadcrumbs Navigation */}
      <nav className="bg-gray-100 p-4 rounded-lg shadow-md">
        {/* For larger screens (md and up), breadcrumbs will be horizontal, stacking vertically for smaller screens */}
        <ol className="flex flex-wrap md:flex-nowrap space-x-2 md:space-x-4 text-sm">
          {/* Breadcrumb Item */}
          <li className="flex items-center">
            <Link to="/" className={`${isActive("/")}`}>
              LandingPage
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>
          
          <li className="flex items-center">
            <Link to="/LoginPage" className={`${isActive("/LoginPage")}`}>
              LoginPage
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>
          
          <li className="flex items-center">
            <Link to="/LoginAdmin" className={`${isActive("/LoginAdmin")}`}>
              LoginAdmin
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>
          
          <li className="flex items-center">
            <Link to="/RegisterAdmin" className={`${isActive("/RegisterAdmin")}`}>
              RegisterAdmin
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>
          
          <li className="flex items-center">
            <Link to="/RegisterPage" className={`${isActive("/RegisterPage")}`}>
              Register
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>
          
          <li className="flex items-center">
            <Link to="/Accommodation" className={`${isActive("/Accommodation")}`}>
              Accommodation
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/BookingPage" className={`${isActive("/BookingPage")}`}>
              BookingPage
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/Bookingview" className={`${isActive("/Bookingview")}`}>
              Bookingview
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/BookingHistory" className={`${isActive("/BookingHistory")}`}>
              BookingHistory
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/PaymentPage" className={`${isActive("/PaymentPage")}`}>
              PaymentPage
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/ProfilePage" className={`${isActive("/ProfilePage")}`}>
              Profile
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/CheckoutPage" className={`${isActive("/CheckoutPage")}`}>
              CheckoutPage
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/FaviratePage" className={`${isActive("/FaviratePage")}`}>
              Favirate
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/RatingPage" className={`${isActive("/RatingPage")}`}>
              RatingPage
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/AdminPost" className={`${isActive("/AdminPost")}`}>
              AdminPost
            </Link>
            <span className="mx-2 text-gray-400 hidden md:inline">/</span>
          </li>

          <li className="flex items-center">
            <Link to="/AdminPage" className={`${isActive("/AdminPage")}`}>
              AdminPage
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
