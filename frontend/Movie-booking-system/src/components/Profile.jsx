import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaListUl, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import axiosInstance from "../../axiosInstance";

const Profile = () => {
  const [user,setUser] = useState([]);
  const {id} =  useParams()


  const getUserInfo = async() =>{
    try{
        const response =  await axiosInstance.get(`/users/get-user-info/${id}`);
        console.log(response);
        setUser(response.data.user)
    } catch(error){
      toast.error("Internal server error");
    }
  }
  
  useEffect(()=>{
    getUserInfo();
  },[])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-sm text-center"
      >
        {/* Profile Image */}
        <div className="relative inline-block">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-pink-500 object-cover shadow-lg"
          />
         
        </div>

        {/* User Name */}
        <h2 className="text-2xl font-bold text-white mt-4">{user.username}</h2>

        {/* Edit Button */}
        <Link to={`/edit-user-info/${user._id}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-5 py-2 bg-pink-600 text-white rounded-full font-medium shadow-lg hover:bg-pink-700 transition-all"
          >
          Edit Profile
        </motion.button>
          </Link>

        {/* Divider */}
        <div className="my-5 border-t border-gray-700"></div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          <ProfileOption
            icon={<FaListUl />}
            label="Watchlist"
            path="/watchlist"
          />
          <ProfileOption icon={<FaCog />} label="Settings" path="/settings" />
          <ProfileOption
            icon={<FaSignOutAlt />}
            label="Logout"
            path="/logout"
            color="text-red-400"
          />
        </div>
      </motion.div>
    </div>
  );
};

// ✅ Reusable Option Component
const ProfileOption = ({ icon, label, path, color }) => (
  <Link to={path}>
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-200 font-medium px-4 py-3 rounded-xl transition-all duration-300 text-left"
    >
      <span className={`text-pink-500 text-lg ${color || ""}`}>{icon}</span>
      <span className="flex-1">{label}</span>
    </motion.button>
  </Link>
);

export default Profile;
