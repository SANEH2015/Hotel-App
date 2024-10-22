import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations, deleteAccommodation, postAccommodation, updateAccommodation, bookAccommodation } from '../features/accommodationsSlice';
import { useNavigate } from 'react-router-dom';

const AdminAccommodations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading, error } = useSelector((state) => state.accommodations);

  // State for the form
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '',
    address: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this accommodation?')) {
      dispatch(deleteAccommodation(id));
    }
  };

  const handleEdit = (accommodation) => {
    setFormData(accommodation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      dispatch(updateAccommodation({ id: formData.id, updatedData: formData }));
    } else {
      dispatch(postAccommodation(formData));
    }
    setFormData({ id: '', title: '', category: '', address: '', description: '', price: '', imageUrl: '' });
  };

  const handleBookRoom = (id) => {
    dispatch(bookAccommodation(id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-8">All Accommodations</h2>

      {/* Form for adding/updating accommodations */}
      <form onSubmit={handleSubmit} className="mb-8">
        <h3 className="text-2xl mb-4">{formData.id ? 'Update Accommodation' : 'Add Accommodation'}</h3>
        <input type="hidden" name="id" value={formData.id} />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
          {formData.id ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Accommodation Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((accommodation) => (
              <tr key={accommodation.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{accommodation.title}</td>
                <td className="border border-gray-300 p-2">{accommodation.category}</td>
                <td className="border border-gray-300 p-2">{accommodation.address}</td>
                <td className="border border-gray-300 p-2">{accommodation.description}</td>
                <td className="border border-gray-300 p-2">R{accommodation.price}</td>
                <td className="border border-gray-300 p-2">
                  <button onClick={() => handleEdit(accommodation)} className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(accommodation.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 ml-2">
                    Delete
                  </button>
                  <button onClick={() => handleBookRoom(accommodation.id)} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 ml-2">
                    Book Room
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAccommodations;
