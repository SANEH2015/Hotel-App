import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { db } from '../firebaseConfig'; // Import Firebase config
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

const Accommodation = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState({});
  const [items, setItems] = useState([]); // State to store accommodations
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from Firestore when the component mounts
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const accommodations = [];
        querySnapshot.forEach((doc) => {
          accommodations.push({ id: doc.id, ...doc.data() });
        });
        setItems(accommodations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accommodations: ", error);
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []); // Empty dependency array ensures this runs once when the component mounts

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

  if (loading) {
    return <div>Loading accommodations...</div>;
  }

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
