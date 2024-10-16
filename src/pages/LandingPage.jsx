import React from 'react'


const LandingPage = () => {
    return (
        <div>
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/736x/eb/72/db/eb72db8f64aca33fda77177ad52217a7--cover-photos.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center justify-center h-full text-white">
                    <h2 className="text-8xl font-bold">A LUXURY PARADISE</h2>
                    <h3 className="text-2xl mt-4">BOOK YOUR ROOM</h3>
                    <button className="mt-5 bg-yellow-500 px-6 py-3 rounded">Reserve Now</button>
                </div>
            </div>
            <section className="p-10 bg-white text-center">
                <h2 className="text-3xl font-bold mb-5">INTRODUCTION OF RESORT</h2>
                <p className="mb-10">Our team is available around the clock to make sure you have everything you need for a comfortable stay at Lairom.</p>
                <div className="flex justify-around">
                    <div className="p-5">
                        <h3 className="font-bold">Restaurant</h3>
                        <p>Price does not include VAT & services fee</p>
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold">Free WiFi</h3>
                        <p>Stay fit and don't miss your workout!</p>
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold">Free Pickup</h3>
                        <p>Enjoy your day in our swimming pool</p>
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold">Security Services</h3>
                        <p>We have a special offer for you! Only this month.</p>
                    </div>
                </div>
            </section>
       
        </div>
    );
};

export default LandingPage;
