import React, { useState } from "react";
import { db, storage } from "../firebaseConfig"; // Import storage
import { addDoc, collection } from "firebase/firestore"; // Firestore functions
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import { useDispatch } from "react-redux";
import { addAccommodation } from "../features/accommodationSlice"; // Import the addAccommodation action to update Redux

const AdminPost = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Selected image
  const [error, setError] = useState(""); // Error state
  const [uploading, setUploading] = useState(false); // Uploading state

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload an image.");
      return;
    }

    // Reset errors and set uploading to true
    setUploading(true);
    setError("");

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `accommodations/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (err) => {
          // Handle errors during upload
          throw new Error(`Upload failed: ${err.message}`);
        },
        async () => {
          // Once upload is complete, get the download URL
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Image URL:", downloadURL);

            // Add accommodation details to Firestore with image URL
            const newAccommodation = {
              name,
              description,
              price: parseFloat(price), // Ensure price is a number
              imageUrl: downloadURL, // Store image URL
            };

            // Post the new accommodation to Firestore
            await addDoc(collection(db, "accommodations"), newAccommodation);

            // Update Redux state immediately to reflect changes in UI
            dispatch(addAccommodation(newAccommodation));

            alert("Accommodation added successfully!");

            setUploading(false);
          } catch (error) {
            console.error("Error getting image URL:", error.message);
            setError("Failed to upload image and save accommodation.");
            setUploading(false);
          }
        }
      );
    } catch (err) {
      console.error("Error uploading image or saving data:", err.message);
      setError("Failed to upload image and save accommodation.");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Accommodation</h2>
      {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Accommodation Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          {image && <p className="mt-2 text-sm text-gray-500">Selected Image: {image.name}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Accommodation"}
        </button>
      </form>

      {/* Display uploaded image preview */}
      {image && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Image Preview:</h3>
          <img src={URL.createObjectURL(image)} alt="Accommodation Preview" className="w-full h-auto mt-2 rounded" />
        </div>
      )}
    </div>
  );
};

export default AdminPost;
