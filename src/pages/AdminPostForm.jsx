import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAccommodation } from '../features/accommodationsSlice';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../firebaseConfig'; // Import the uploadImage function
import Footer from '../component/Footer';
import Sidebar from '../component/Sidebar'; // Import Sidebar

const AdminPostForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('2Bed Rooms');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(''); // For image preview
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Display image preview before uploading
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImageURL(objectURL); // Preview the uploaded image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !address || !description || !price || !image) {
      alert('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Upload the image to Firebase Storage
      const uploadedImageURL = await uploadImage(image);
      
      // Step 2: Create accommodation data with image URL
      const accommodationData = {
        title,
        category,
        address,
        description,
        price: parseFloat(price),
        image: uploadedImageURL,  // Add the image URL to the accommodation data
      };

      // Step 3: Dispatch the post accommodation action
      await dispatch(postAccommodation(accommodationData)); 
      alert('Accommodation posted successfully!');
      navigate('AdminAccommodations'); // Navigate to Admin Accommodations page

    } catch (error) {
      console.error('Failed to post accommodation:', error);
      alert('Failed to post accommodation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Form Area */}
      <div className="flex-1 p-8 ml-64 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Post New Accommodation</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="2Bed Rooms">2 Bedrooms</option>
              <option value="1Bed Room">1 Bedroom</option>
              <option value="Room with Balcony">Room with Balcony</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleImageChange}
              required
            />
            {/* Show the image preview */}
            {imageURL && (
              <div className="mt-4">
                <img src={imageURL} alt="Image Preview" className="w-full h-auto border rounded-md" />
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (ZAR)</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Accommodation'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
 
    </div>
  );
};

export default AdminPostForm;
