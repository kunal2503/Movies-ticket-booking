import React, { useEffect, useState } from "react";
import Movies from "../components/Movies";
import axiosInstance from "../../axiosInstance";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MoviesListing = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/movies/get-all-movies");
      setMoviesList(response?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-[80vh] w-full px-6 md:px-10 py-10 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white transition-colors duration-500">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-pink-500 drop-shadow-lg mb-8">
        🎬 Now Showing
      </h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <motion.div
            className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-500 font-semibold py-10">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && moviesList.length === 0 && (
        <div className="text-center text-gray-400 font-medium py-20">
          No movies available yet. 🎥 <br />
          Add some movies to get started!
        </div>
      )}

      {/* Movies Grid */}
      
      {!loading && moviesList.length > 0 && (

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {moviesList.map((movie, index) => (
        // <Link  to={`/movie-details/${movie._id}`}>
            <motion.div
            key={movie._id || index}
            // initial={{ opacity: 0, scale: 0.95 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{ delay: index * 0.05 }}
            // whileHover={{ scale: 1.03 }}
            >
              <Movies movie={movie} />
            </motion.div>
          // </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MoviesListing;
