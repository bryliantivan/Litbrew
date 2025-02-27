import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// const cors = require('cors');
// app.use(cors());

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const location = useLocation();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      alert("Registration successful! silahkan login");
      // Redirect to login page or other actions
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full sm:max-w-md bg-[#CFF2F5] rounded-lg shadow-md p-6 dark:bg-gray-800">
        <div className="flex justify-between bg-blue-200 p-1 rounded-full mb-6">
          <Link
            to="/login"
            className={`w-1/2 text-center py-2 rounded-full transition-all ${
              location.pathname === "/login" ? "bg-[#07779D] text-[#CFF2F5]" : "text-[#07779D]"
            }`}
          >
            Log In
          </Link>
          <Link
            to="/register"
            className={`w-1/2 text-center py-2 rounded-full transition-all ${
              location.pathname === "/register" ? "bg-[#07779D] text-[#CFF2F5]" : "text-[#07779D]"
            }`}
          >
            Sign Up
          </Link>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
          Create an account
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full group mb-4">
            <input
              type="text"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#07779D] focus:outline-none focus:ring-0 focus:border-[#07779D] peer"
              placeholder=" "
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            <label
              htmlFor="username"
              className="absolute text-sm text-[#07779D] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>

          <div className="relative z-0 w-full group mb-4">
            <input
              type="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#07779D] focus:outline-none focus:ring-0 focus:border-[#07779D] peer"
              placeholder=" "
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-[#07779D] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <div className="relative z-0 w-full group mb-4">
            <input
              type="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#07779D] focus:outline-none focus:ring-0 focus:border-[#07779D] peer"
              placeholder=" "
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-[#07779D] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="relative z-0 w-full group mb-4">
            <input
              type="password"
              id="confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#07779D] focus:outline-none focus:ring-0 focus:border-[#07779D] peer"
              placeholder=" "
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <label
              htmlFor="confirmPassword"
              className="absolute text-sm text-[#07779D] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="appearance-none w-5 h-5 border-2 border-[#07779D] rounded-full checked:bg-[#07779D] cursor-pointer"
              required
            />
            <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
              I accept the <a href="#" className="font-medium text-[#07779D] hover:underline">terms and privacy policy</a>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2.5 px-5 text-sm font-medium text-[#CFF2F5] bg-[#07779D] rounded-full hover:bg-white hover:text-[#07779D] transition-all"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
