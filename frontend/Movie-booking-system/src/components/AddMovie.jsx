import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { motion } from "framer-motion";
import { FaUpload, FaFilm } from "react-icons/fa";
import { toast } from "react-toastify";

const AddMovie = () => {
  const [moviesData, setMoviesData] = useState({
    movieName: "",
    category: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChanges = (e) => {
    const { name, value, files } = e.target;
    setMoviesData({
      ...moviesData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAddMovies = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("movieName", moviesData.movieName);
      formData.append("category", moviesData.category);
      formData.append("description", moviesData.description);
      formData.append("image", moviesData.image);

      const response = await axiosInstance.post("/movies/add-movie", formData,{headers: { "Content-Type": "multipart/form-data" },});

      if (response.status === 201) {
        toast.success("✅ Movie added successfully!");
        setMoviesData({
          movieName: "",
          category: "",
          description: "",
          image: null,
        });
      } else {
        toast.error("Failed to add movie");
      }

    } catch (error) {
      console.log(error)
      toast.error("Error adding movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-10">
      <motion.form
        onSubmit={handleAddMovies}
        encType="multipart/form-data"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg border border-gray-700 shadow-2xl rounded-3xl p-8 w-full max-w-lg text-white"
      >
        <div className="flex items-center justify-center mb-6">
          <FaFilm className="text-pink-500 text-4xl mr-2" />
          <h1 className="text-3xl font-bold">Add New Movie</h1>
        </div>

        {/* Movie Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-200">Movie Name</label>
          <input
            type="text"
            name="movieName"
            value={moviesData.movieName}
            onChange={handleChanges}
            placeholder="Enter movie name"
            className="w-full bg-gray-800/70 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-200">Category</label>
          <select
            name="category"
            value={moviesData.category}
            onChange={handleChanges}
            className="w-full bg-gray-800/70 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            required
          >
            <option value="">Choose a category</option>
            <option value="Action">Action</option>
            <option value="Crime">Crime</option>
            <option value="Adventure">Adventure</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-200">Description</label>
          <textarea
            name="description"
            value={moviesData.description}
            onChange={handleChanges}
            placeholder="Write a short description..."
            className="w-full bg-gray-800/70 border border-gray-600 rounded-lg px-4 py-2 h-28 resize-none focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-medium mb-1 text-gray-200">Upload Poster</label>
          <div className="flex items-center justify-between bg-gray-800/70 border border-gray-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-800 transition">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChanges}
              className="w-full text-gray-300 cursor-pointer"
              required
            />
            <FaUpload className="text-pink-400 text-xl ml-2" />
          </div>
        </div>

        {/* Image Preview */}
        {moviesData.image && (
          <div className="mb-6 text-center">
            <p className="text-gray-300 mb-2 font-medium">Preview</p>
            <motion.img
              src={URL.createObjectURL(moviesData.image)}
              alt="Preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-40 h-40 mx-auto object-cover rounded-xl border border-gray-600 shadow-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg py-3 mt-4 transition-all duration-300 disabled:bg-gray-500"
        >
          {loading ? "Adding Movie..." : "Add Movie"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddMovie;
