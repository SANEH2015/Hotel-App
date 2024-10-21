import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations, deleteAccommodation } from '../features/accommodationsSlice'; // Add deleteAccommodation action
import { useNavigate } from 'react-router-dom'; // To navigate to the update form

const AdminAccommodations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading, error } = useSelector((state) => state.accommodations);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this accommodation?')) {
      dispatch(deleteAccommodation(id)); // Dispatch delete action
    }
  };

  const handleUpdate = (id) => {
    navigate(`/AdminPostForm/${id}`); // Navigate to update form
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-8">All Accommodations</h2>

      {/* Accommodation List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((accommodation) => (
          <div key={accommodation.id} className="bg-white p-4 rounded-lg shadow-lg">
            {/* Debugging: log image URL */}
            <div className="mb-2 text-red-500">
              <p>Image URL: {accommodation.imageUrl}</p>
            </div>

            {/* Image Display */}
            <img
              src={accommodation.imageUrl ? accommodation.imageUrl : '/default-image.jpg'} // Fallback image if URL is not available
              alt={accommodation.title}
              className="w-full h-64 object-cover mb-4 rounded-md"
            />

            {/* Accommodation Details */}
            <h3 className="text-xl font-semibold">{accommodation.title}</h3>
            <p className="text-gray-600">{accommodation.category}</p>
            <p className="text-gray-600">{accommodation.address}</p>
            <p className="text-gray-600">{accommodation.description}</p>
            <p className="text-gray-600">R{accommodation.price}</p>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              {/* Update Button */}
              <button
                onClick={() => handleUpdate(accommodation.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all duration-300"
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(accommodation.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAccommodations;
