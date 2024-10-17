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
            {/* Accommodation Content (similar to what you showed earlier) */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAccommodations;
