import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  setRole,
  setCompanyName,
  setCompanyAddress,
  setPhoneNumber,
  setAdminEmail,
  resetForm,
} from '../features/RegisterSlice'; 
import { registerUser } from '../firebaseConfig'; 

const RegisterForm = () => {
  const dispatch = useDispatch();

  // Get form state from Redux store
  const { username, email, password, confirmPassword, role, companyName, companyAddress, phoneNumber, adminEmail } = useSelector(state => state.register);

  // Local state for form validation errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyAddress: '',
    phoneNumber: '',
    adminEmail: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        dispatch(setUsername(value));
        break;
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'password':
        dispatch(setPassword(value));
        break;
      case 'confirmPassword':
        dispatch(setConfirmPassword(value));
        break;
      case 'role':
        dispatch(setRole(value));
        break;
      case 'companyName':
        dispatch(setCompanyName(value));
        break;
      case 'companyAddress':
        dispatch(setCompanyAddress(value));
        break;
      case 'phoneNumber':
        dispatch(setPhoneNumber(value));
        break;
      case 'adminEmail':
        dispatch(setAdminEmail(value));
        break;
      default:
        break;
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = { username: '', email: '', password: '', confirmPassword: '', companyName: '', companyAddress: '', phoneNumber: '', adminEmail: '' };

    if (!username) newErrors.username = 'Username is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (role === 'admin') {
      if (!companyName) newErrors.companyName = 'Company name is required';
      if (!companyAddress) newErrors.companyAddress = 'Company address is required';
      if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
      if (!adminEmail) newErrors.adminEmail = 'Admin email is required';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(error => error === '');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If validation passes
    if (validateForm()) {
      try {
        const user = await registerUser(email, password); // Register the user
        console.log("User registered:", user);

        // You can now store user data in Firestore if needed
        // Example: save additional user details like username, role, and admin info

        // Reset form fields
        dispatch(resetForm());
        setErrors({ username: '', email: '', password: '', confirmPassword: '', companyName: '', companyAddress: '', phoneNumber: '', adminEmail: '' });

        alert('Registration successful!');

      } catch (err) {
        setErrors({ ...errors, email: err });
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      
      {/* Role selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={handleInputChange}
              className="mr-2"
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={handleInputChange}
              className="mr-2"
            />
            Admin
          </label>
        </div>
      </div>

      {/* Common fields for both Admin and User */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>

        {/* Admin-specific fields */}
        {role === 'admin' && (
          <>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Company Address</label>
              <input
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={companyAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.companyAddress && <p className="text-red-500 text-xs">{errors.companyAddress}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">Admin Email</label>
              <input
                type="email"
                id="adminEmail"
                name="adminEmail"
                value={adminEmail}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.adminEmail && <p className="text-red-500 text-xs">{errors.adminEmail}</p>}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
