import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaPlus, FaStar } from "react-icons/fa";

const WatchList = () => {
  const [watchList, setWatchList] = useState([
    {
      id: 1,
      title: "Avengers: Endgame",
      genre: "Action, Sci-Fi",
      rating: 8.4,
      poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
    },
    {
      id: 2,
      title: "Joker",
      genre: "Drama, Crime, Thriller",
      rating: 8.5,
      poster: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    },
    {
      id: 3,
      title: "Spider-Man: No Way Home",
      genre: "Action, Adventure",
      rating: 8.2,
      poster: "https://m.media-amazon.com/images/I/81E4zUfdGHL._AC_SY679_.jpg",
    },
  ]);

  const removeFromWatchList = (id) => {
    setWatchList((prev) => prev.filter((movie) => movie.id !== id));
  };

  const addToBookedMovies = (movie) => {
    console.log("Booked:", movie.title);
    removeFromWatchList(movie.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-10 px-6 transition-colors duration-500">
      <h1 className="text-3xl font-extrabold text-center text-pink-600 mb-10">
        🎬 My Watchlist
      </h1>

      {watchList.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No movies in your watchlist yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {watchList.map((movie) => (
            <motion.div
              key={movie.id}
              className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800"
              whileHover={{ scale: 1.03 }}
            >
              {/* Poster */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>

              {/* Info */}
              <div className="p-5 text-center space-y-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {movie.genre}
                </p>
                <div className="flex justify-center items-center gap-1 text-yellow-400 text-sm">
                  <FaStar /> <span>{movie.rating}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToBookedMovies(movie)}
                    className="flex-1 flex items-center justify-center gap-2 bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700 transition"
                  >
                    <FaPlus /> Book Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFromWatchList(movie.id)}
                    className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                  >
                    <FaTrashAlt />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
