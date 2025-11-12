import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaTicketAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const Movies = ({ movie }) => {
  const [like,setLike] =  useState(false);
  const [book,setBook] = useState(false);
  const [likesCount,setLikesCount] = useState(0);
  const userId = localStorage.getItem("userId")
  const navigate =  useNavigate()

  const handleLike = async(e) =>{
    try {
      const newLikeState =  !like;
      setLike(newLikeState);
      const response = await axiosInstance.post(`/likes/like-movie/${movie._id}/user/${userId}`,{like : newLikeState});
      console.log(response);
      setLikesCount(response.data.likes);
      
      console.log(book)
    } catch(error){
      console.log(error.stack)
      toast.error("Internal server error");
      setLike(like)
    }
  }

  const fetchLikesCount = async() =>{
    try{
      const response =  await axiosInstance.get(`/likes/like-count/${movie._id}/${userId}`)
      const {likes, userLike} =  response.data;
      setLike(userLike);
      setLikesCount(likes);
      toast.success("All working good");
    } catch(error){
      toast.error("Unable to fetch likes count");
    }
  }
  
const handleBooking =  async() =>{
    try{
      const response =  await axiosInstance.post("/api/bookings",{movieId : movie._id,userId : userId});
      setBook(response.data.userBookedMovie)
    } catch(error){
      toast.error("Internal server error");
    }
}

  useEffect(()=>{
    const intervel = setInterval(() => {
      fetchLikesCount();
    }, 60000);

    return () =>{
      clearInterval(intervel)
    }
  },[])

  return (
    <motion.div
      // whileHover={{ scale: 1.03 }}
      className="bg-gray-900 border border-gray-800  rounded-2xl shadow-lg hover:shadow-sm overflow-hidden transition-all duration-300 w-full max-w-sm mx-auto relative group"
    >
      {/* Movie Poster */}
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src={movie.image}
          alt={movie.movieName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 "
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Hover overlay */}
        { book ? null :
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur-sm">
          <motion.button
            onClick={handleBooking}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition"
            >
            <FaTicketAlt  /> Book Ticket
          </motion.button>
        </div> 
          }
      </div>

      {/* Movie Info */}
      <div className="absolute right-2 top-2 bg-black/60 backdrop-blur-sm  p-2 rounded-full ">
        <FaHeart className={like ? "text-pink-500" : "text-white"} onClick={handleLike}/>
      </div>
      <div className="absolute right-3 top-7 p-2 rounded-full text-white font-semibold">
        {likesCount}
      </div>
        <Link to={`/movie-details/${movie._id}`}>
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-white mb-1 truncate">
          {movie.movieName}
        </h2>
        <p className="text-sm text-pink-500 font-medium mb-2 uppercase tracking-wide">
          {movie.category}
        </p>
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {movie.description || "No description available."}
        </p>
      </div>
            </Link>
      
    </motion.div>
  );
};

export default Movies;
