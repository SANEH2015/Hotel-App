import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, accommodation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    paymentMethod: '',
  });
  
  const [totalPrice, setTotalPrice] = useState(0); // State to store the total price

  // Function to calculate the total price based on check-in and check-out dates
  const calculateTotalPrice = () => {
    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    if (checkInDate && checkOutDate && formData.checkInDate && formData.checkOutDate) {
      const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
      if (nights > 0) {
        setTotalPrice(nights * accommodation.price); // Total price is nights * price per night
      } else {
        setTotalPrice(0); // If check-out is before check-in, reset total to 0
      }
    }
  };

  // Watch for changes in check-in or check-out dates and recalculate the total price
  useEffect(() => {
    calculateTotalPrice();
  }, [formData.checkInDate, formData.checkOutDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if check-out date is after check-in date
    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);

    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    // Process the booking logic here (e.g., send formData to a backend)
    alert('Booking submitted successfully!');
    onClose(); // Close the modal after submitting
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Checkout for {accommodation.title}</h2>
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Check-In Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Check-In Date</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Check-Out Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Check-Out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Display Total Price */}
          <div className="mb-4">
            <p className="text-lg font-semibold">Total Price: R{totalPrice.toFixed(2)}</p>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Submit Booking
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
