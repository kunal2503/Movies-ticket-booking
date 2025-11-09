import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Validation
  const validate = (name, value) => {
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "Email is required.";
        else if (!emailRegex.test(value)) return "Enter a valid email.";
        else return "";
      case "password":
        if (!value.trim()) return "Password is required.";
        else if (value.length < 6) return "Password must be at least 6 characters.";
        else return "";
      default:
        return "";
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Real-time validation
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check
    const newErrors = {
      email: validate("email", userData.email),
      password: validate("password", userData.password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/signin", userData);
      // Example: store token and navigate to home
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token", response.data.userId);
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      toast.success(error?.response?.data?.message || "Login failed");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-xl p-10 flex flex-col gap-6 border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center text-pink-500 drop-shadow-lg">
          Sign In
        </h1>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-300 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChanges}
            placeholder="Enter your email"
            className={`px-4 py-2 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-600"
            } bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-gray-300 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChanges}
            placeholder="Enter your password"
            className={`px-4 py-2 rounded-lg border ${
              errors.password ? "border-red-500" : "border-gray-600"
            } bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 mt-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition duration-300 disabled:bg-gray-500"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Signup Link */}
        <p className="text-gray-400 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signin;
