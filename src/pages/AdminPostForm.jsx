import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAccommodation } from '../features/accommodationsSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminPostForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('2Bed Rooms');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !address || !description || !price || !image) {
      alert('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const accommodationData = {
        title,
        category,
        address,
        description,
        price: parseFloat(price),
      };
      // Dispatch the post accommodation action
      await dispatch(postAccommodation(accommodationData, image));
      alert('Accommodation posted successfully!');
      navigate('/admin/accommodations'); // Replace history.push with navigate
    } catch (error) {
      console.error('Failed to post accommodation:', error);
      alert('Failed to post accommodation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-8">Post New Accommodation</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="2Bed Rooms">2 Bedrooms</option>
            <option value="1Bed Room">1 Bedroom</option>
            <option value="Room with Balcony">Room with Balcony</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Accommodation'}
        </button>
      </form>
    </div>
  );
};

export default AdminPostForm;
