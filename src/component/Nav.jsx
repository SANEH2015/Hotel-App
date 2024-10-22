import React from 'react';

const Nav = () => {
    return (
        <header className="flex justify-between items-center p-5 bg-white shadow">
            <h1 className="text-4xl font-bold">Lairom</h1>
            <nav className="space-x-4">
                <a href="LandingPage" className="text-gray-700">Home</a>
                <a href="RegisterPage" className="text-gray-700">Register</a>
                <a href="LoginPage" className="text-gray-700">Login</a>
                <a href="Accommodation" className="text-gray-700">Accommodation</a>
                <a href="AdminPostForm" className="text-gray-700">Admin </a>
               
                <a href="#" className="text-gray-700">Contact</a>
            </nav>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">Book Now</button>
        </header>
    );
};

export default Nav;