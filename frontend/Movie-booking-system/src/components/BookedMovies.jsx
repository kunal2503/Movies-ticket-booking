import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaTimesCircle, FaFilm } from "react-icons/fa";
import { motion } from "framer-motion";

const BookedMovies = () => {
  const [bookedMovies, setBookedMovies] = useState([
    {
      id: 1,
      title: "Inception",
      genre: "Sci-Fi, Thriller",
      date: "Oct 18, 2025",
      time: "7:30 PM",
      poster: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_SY679_.jpg",
    },
    {
      id: 2,
      title: "The Dark Knight",
      genre: "Action, Crime",
      date: "Oct 20, 2025",
      time: "9:00 PM",
      poster: "https://m.media-amazon.com/images/I/71poxXb1VhL._AC_SY679_.jpg",
    },
    {
      id: 3,
      title: "Interstellar",
      genre: "Adventure, Drama, Sci-Fi",
      date: "Oct 25, 2025",
      time: "6:00 PM",
      poster: "https://m.media-amazon.com/images/I/81kJcUeOePL._AC_SY679_.jpg",
    },
  ]);

  // Cancel booking logic
  const cancelBooking = (id) => {
    const updatedList = bookedMovies.filter((movie) => movie.id !== id);
    setBookedMovies(updatedList);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-10 px-6 text-white">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center mb-2">
          <FaFilm className="text-pink-500 text-3xl mr-2" />
          <h1 className="text-3xl font-bold tracking-wide">My Booked Movies</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Manage your booked movies and upcoming shows 🎟️
        </p>
      </div>

      {/* Movie Cards */}
      {bookedMovies.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mt-20 text-lg"
        >
          You haven’t booked any movies yet.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookedMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-pink-500/20 hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{movie.genre}</p>

                <div className="flex items-center text-sm text-gray-300 mb-2">
                  <FaCalendarAlt className="mr-2 text-pink-500" /> {movie.date}
                </div>
                <div className="flex items-center text-sm text-gray-300 mb-5">
                  <FaClock className="mr-2 text-pink-500" /> {movie.time}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => cancelBooking(movie.id)}
                  className="flex items-center justify-center gap-2 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium transition"
                >
                  <FaTimesCircle /> Cancel Booking
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedMovies;
