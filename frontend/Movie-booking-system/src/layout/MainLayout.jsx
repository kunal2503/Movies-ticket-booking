import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MoviesListing from "../pages/MoviesListing";
import AddMovie from "../components/AddMovie";
import Profile from "../components/Profile";
import BookedMovies from "../components/BookedMovies";
import WatchList from "../components/WatchList";
import Settings from "../components/Setting";
// import ProfileImageEdit from "../components/ProfileImageEdit";
import UserProfileEdit from "../components/UserProfileEdit";
import MovieDetails from "../components/MoviesDetails";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white transition-all duration-500">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<MoviesListing />} />
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/book-movies" element={<BookedMovies />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/edit-user-info/:id" element={<UserProfileEdit/>} />
              <Route path="/movie-details/:id" element={<MovieDetails/>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
