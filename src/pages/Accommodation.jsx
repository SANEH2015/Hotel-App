import React, { useState } from 'react';


import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Accommodation = () => {
  const [activeCategory, setActiveCategory] = useState('all');
 
  const [favorites, setFavorites] = useState({});

  
  const items = [
    { id: 1, category: '2Bed Rooms', image: 'https://th.bing.com/th?id=OIP.w5PUvE5RNxlyp3Au5RLVAQHaE2&w=308&h=202&c=8&rs=1&qlt=90&o=6&cb=13&dpr=1.5&pid=3.1&rm=2', title: 'Spacious Suite', description: 'A spacious 2-bedroom suite with a modern kitchen and living area.', address: '1234 Elm Street, Springfield', price: 120 },
    { id: 2, category: '2Bed Rooms', image: 'https://th.bing.com/th/id/OIP.jn6W5vU0NLEF_xxBTxtHHwHaE8?w=276&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7', title: 'Penthouse View', description: 'Luxury penthouse with floor-to-ceiling windows and a rooftop terrace.', address: '5678 Oak Avenue, Springfield', price: 250 },
    { id: 3, category: '1Bed Room', image: 'https://th.bing.com/th/id/OIP.giAXnbM94RO98vGbtpB90QHaFj?w=245&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7', title: 'Cozy Retreat', description: 'A cozy 1-bedroom retreat with a warm atmosphere and a garden view.', address: '9101 Pine Lane, Springfield', price: 80 },
    { id: 4, category: 'Room with Balcony', image: 'http://ts1.mm.bing.net/th?id=OIP.4FNO0vXw64tByCWBBWkiAAAAAA&pid=15.1', title: 'Balcony Escape', description: 'A charming room with a balcony that overlooks the city skyline.', address: '1357 Birch Boulevard, Springfield', price: 150 },
    { id: 5, category: 'Room with Balcony', image: 'http://ts2.mm.bing.net/th?id=OIP.-OetIklw2Km93-cnZZmq3AAAAA&pid=15.1', title: 'Urban Loft', description: 'Modern loft-style room with a private balcony and quick city access.', address: '2468 Cedar Court, Springfield', price: 200 },
  ];

  // Filtered items based on active category
  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  // Handle heart click to toggle favorite
  const handleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the current favorite status
    }));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <hr className="mb-8" />
      <h2 className="text-3xl font-semibold text-center mb-8">Accommodation</h2>

      {/* Category Buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          className={`btn ${activeCategory === 'all' ? 'bg-gray-600 text-white' : 'bg-white'} px-6 py-2 rounded-md`}
          onClick={() => setActiveCategory('all')}
        >
          Show all
        </button>
        <button
          className={`btn ${activeCategory === '2Bed Rooms' ? 'bg-gray-600 text-white' : 'bg-white'} px-6 py-2 rounded-md`}
          onClick={() => setActiveCategory('2Bed Rooms')}
        >
          2 Bedrooms
        </button>
        <button
          className={`btn ${activeCategory === '1Bed Room' ? 'bg-gray-600 text-white' : 'bg-white'} px-6 py-2 rounded-md`}
          onClick={() => setActiveCategory('1Bed Room')}
        >
          1 Bedroom
        </button>
        <button
          className={`btn ${activeCategory === 'Room with Balcony' ? 'bg-gray-600 text-white' : 'bg-white'} px-6 py-2 rounded-md`}
          onClick={() => setActiveCategory('Room with Balcony')}
        >
          Room with Balcony
        </button>
      </div>

      {/* Accommodation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg relative">
            {/* Image */}
            <div className="relative">
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover mb-4 rounded-md" />

              {/* Heart Icon */}
              <button 
                onClick={() => handleFavorite(item.id)}
                className="absolute top-2 right-2 text-red-500 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                {favorites[item.id] ? (
                  <FaHeart size={24} /> // Filled heart
                ) : (
                  <FaRegHeart size={24} /> // Empty heart
                )}
              </button>
            </div>

            {/* Category Label */}
            <div className="text-sm text-gray-500 mb-2">
              Category: <span className="font-semibold">{item.category}</span>
            </div>

            {/* Title */}
            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>

            {/* Description */}
            <p className="text-gray-600 mb-4">{item.description}</p>

            {/* Address */}
            <p className="text-gray-600 mb-2">Address: {item.address}</p>

            {/* Price in ZAR (Rands) */}
            <p className="text-gray-600 mb-4">Price: R{item.price.toFixed(2)}</p>

            {/* Book Now Button */}
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;
