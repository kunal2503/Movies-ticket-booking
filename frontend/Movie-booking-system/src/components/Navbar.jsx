import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user,setUser] = useState("");
  const location = useLocation();
  const userId =  localStorage.getItem("userId");
  

  const navLinks = [
    { name: "Movies", path: "/" },
    { name: "Book Movies", path: "/book-movies" },
    { name: "Add Movie", path: "/add-movie" },
  ];

  const getUserInfo = async()=>{
    try{
      const response =  await axiosInstance.get(`/users/get-user-info/${userId}`);
      console.log(response.data);
      setUser(response.data.user);
    } catch(error){
      toast.error("Internal server error");
    }
  }
    useEffect(()=>{
      getUserInfo()
    },[])
    
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-2 z-50 mx-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full shadow-xl px-6 py-3"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.h1
          className="font-extrabold text-2xl cursor-pointer select-none tracking-wide"
          whileHover={{ scale: 1.05 }}
        >
          🎟️ <span className="text-pink-500">BookShow</span>
        </motion.h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`transition-all duration-300 hover:text-pink-400 ${
                  location.pathname === link.path ? "text-pink-500" : "text-gray-200"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <Link
              to={`/profile/${userId}`}
              className={`transition-all duration-300 hover:text-pink-400 ${
                location.pathname === "/profile" ? "text-pink-500" : "text-gray-200"
              }`}
            >
              {user?.profileImage ? <img className="rounded-full w-10 h-10" src={user.profileImage} alt={user.userName} /> : <CgProfile size={26} />
              }
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none text-white"
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col mt-4 space-y-4 md:hidden bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 font-semibold shadow-lg"
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block transition-all duration-300 ${
                  location.pathname === link.path ? "text-pink-400" : "text-white"
                } hover:text-pink-400`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <Link
              to={`/profile/${userId}`}
              onClick={() => setMenuOpen(false)}
              className={`block transition-all duration-300 ${
                location.pathname === "/profile" ? "text-pink-400" : "text-white"
              } hover:text-pink-400`}
            >
              <CgProfile size={22} className="inline-block mr-2" /> Profile
            </Link>
          </li>
        </motion.ul>
      )}
    </motion.nav>
  );
};

export default Navbar;
