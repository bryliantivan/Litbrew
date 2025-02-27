import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false); // State for checkbox
    const navigate = useNavigate(); // useNavigate hook to redirect after login

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!acceptTerms) {
            setErrorMessage("You must accept the terms and conditions.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/users/login", {
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem('isAdmin', response.data.isAdmin);
                window.dispatchEvent(new Event("storage"));
                setErrorMessage(""); // Reset error message on successful login
                console.log(response.data);
                console.log(response.data.isAdmin);

                // Check if the user is an admin and redirect accordingly
                if (response.data.isAdmin) {
                    // If the user is an admin, redirect to admin page
                    navigate("/AdminHome");
                } else {
                    // If the user is not an admin, redirect to home page
                    navigate("/");
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || "Something went wrong. Please try again.");
            } else {
                setErrorMessage("Failed to communicate with server. Please try again.");
            }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
            <div className="w-full sm:max-w-md bg-[#CFF2F5] rounded-lg shadow-md p-6">
                <div className="flex justify-between bg-blue-200 p-1 rounded-full mb-6">
                    <Link
                        to="/login"
                        className={`w-1/2 text-center py-2 rounded-full transition-all ${window.location.pathname === "/login"
                            ? "bg-[#07779D] text-[#CFF2F5]"
                            : "text-[#07779D]"}`
                        }
                    >
                        Log In
                    </Link>
                    <Link
                        to="/register"
                        className={`w-1/2 text-center py-2 rounded-full transition-all ${window.location.pathname === "/register"
                            ? "bg-[#07779D] text-[#CFF2F5]"
                            : "text-[#07779D]"}`
                        }
                    >
                        Sign Up
                    </Link>
                </div>

                <h1 className="text-xl font-bold text-gray-900 md:text-2xl mb-6 dark:text-white">
                    Login to your account
                </h1>
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {errorMessage}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full group mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#07779D] focus:outline-none focus:ring-0 focus:border-[#07779D] peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm text-[#07779D] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                    </div>

                    <div className="flex items-start text-[#07779D] mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            className="block py-2.5 px-0 w-full text-sm text-[#07779D] bg-transparent border-0 border-b-2 border-[#07779D] focus:outline-none focus:ring-0 focus:border-[#07779D] peer placeholder-[#07779D]"
                            placeholder="Password"
                            required
                        />
                        <label
                            htmlFor="password"
                            className="absolute text-sm text-[#07779D] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="appearance-none w-5 h-5 border-2 border-[#07779D] rounded-full checked:bg-[#07779D] cursor-pointer"
                        />
                        <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
                            I accept the{" "}
                            <a href="#" className="font-medium text-[#07779D] hover:underline">
                                terms and privacy policy
                            </a>
                        </label>
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="w-full py-2.5 px-5 text-sm font-medium text-[#CFF2F5] bg-[#07779D] rounded-full hover:bg-white hover:text-[#07779D] transition-all"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                <p className="text-sm font-light text-gray-500 mt-4">
                    Forgot your password?{" "}
                    <a href="#" className="font-medium text-[#07779D] hover:underline">
                        Reset it here
                    </a>
                </p>
            </div>
        </section>
    );
};

export default Login;
