import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations } from '../features/accommodationsSlice';

const AdminAccommodations = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.accommodations);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-8">All Accommodations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((accommodation) => (
          <div key={accommodation.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={accommodation.imageUrl} // Display the image
              alt={accommodation.title}
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold">{accommodation.title}</h3>
            <p className="text-gray-600">{accommodation.category}</p>
            <p className="text-gray-600">{accommodation.address}</p>
            <p className="text-gray-600">{accommodation.description}</p>
            <p className="text-gray-600">${accommodation.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAccommodations;
