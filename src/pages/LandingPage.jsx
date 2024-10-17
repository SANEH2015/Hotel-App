import React from 'react';
import { FaUtensils, FaWifi, FaTaxi, FaShieldAlt } from 'react-icons/fa'; // Font Awesome icons for example
import Footer from '../component/Footer';

const LandingPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/736x/eb/72/db/eb72db8f64aca33fda77177ad52217a7--cover-photos.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center justify-center h-full text-white">
                    <h2 className="text-8xl font-bold">A LUXURY PARADISE</h2>
                    <h3 className="text-2xl mt-4">BOOK YOUR ROOM</h3>
                    <button className="mt-5 bg-yellow-500 px-6 py-3 rounded text-white font-semibold hover:bg-yellow-400 transition-all duration-300">
                        Reserve Now
                    </button>
                </div>
            </div>

            {/* Introduction Section */}
            <section className="p-10 bg-white text-center">
                <h2 className="text-3xl font-bold mb-5">INTRODUCTION OF RESORT</h2>
                <p className="mb-10">Our team is available around the clock to make sure you have everything you need for a comfortable stay at Lairom.</p>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Restaurant Card */}
                    <div className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-yellow-500 text-5xl mb-4">
                            <FaUtensils />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Restaurant</h3>
                        <p className="text-gray-600">Price does not include VAT & services fee</p>
                    </div>

                    {/* Free WiFi Card */}
                    <div className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-blue-500 text-5xl mb-4">
                            <FaWifi />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Free WiFi</h3>
                        <p className="text-gray-600">Stay fit and don't miss your workout!</p>
                    </div>

                    {/* Free Pickup Card */}
                    <div className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-green-500 text-5xl mb-4">
                            <FaTaxi />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Free Pickup</h3>
                        <p className="text-gray-600">Enjoy your day in our swimming pool</p>
                    </div>

                    {/* Security Services Card */}
                    <div className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-gray-500 text-5xl mb-4">
                            <FaShieldAlt />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Security Services</h3>
                        <p className="text-gray-600">We have a special offer for you! Only this month.</p>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default LandingPage;
