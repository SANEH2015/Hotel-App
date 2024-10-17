// src/components/LoginForm.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setRole, resetAuth } from "../features/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginForm = () => {
  const dispatch = useDispatch();

  // Get role from Redux state
  const { role } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle role change
  const handleRoleChange = (e) => {
    dispatch(setRole(e.target.value));
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
      alert("Login successful!");
      // Reset form after successful login
      setEmail("");
      setPassword("");
      dispatch(resetAuth());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

      {/* Role selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={handleRoleChange}
              className="mr-2"
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={handleRoleChange}
              className="mr-2"
            />
            Admin
          </label>
        </div>
      </div>

      {/* Email field */}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
