import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import {MdEdit} from "react-icons/md";

const MovieDetails = () => {
    const navigate = useNavigate();
    const [movie,setMovie] = useState("");
    const [likes,setLikes] =  useState(false);
    const movieId =  useParams().id;
    const userId = localStorage.getItem("userId");

    const fetchMovieDetails =  async()=>{
        try {
            const response =  await axiosInstance.get(`/movies/movie-details/${movieId}`);
            setMovie(response?.data);
        } catch(error){
            console.log(error.stack);
        }
    }


      const handleEdit = (e) =>{
        try{
            console.log("Edit clicked");
        } catch(error){
          toast.error("Internal server error");
        }
      }

      

    useEffect(()=>{
        fetchMovieDetails()
    },[])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black py-10 px-4">
      <div className="relative max-w-4xl w-full bg-gray-900 shadow-2xl rounded-2xl overflow-hidden border border-gray-800 transition-transform duration-300 ">
        
        {/* Movie Poster Section */}
        <div className="relative w-full h-96 overflow-hidden">
          <img
            src={movie.image}
            alt={movie.moviesName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

          {/* Floating Like Button */}
          <div
            className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-3 rounded-full cursor-pointer hover:bg-black/60 transition duration-300"
          >
            <FaHeart
              className={`text-2xl transition duration-300 ${
                likes ? "text-pink-500 scale-110" : "text-white"
              }`}
            />
            <span>{}</span>
          </div>
          <div
            onClick={()=> handleEdit}
            className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-3 rounded-full cursor-pointer hover:bg-black/60 transition duration-300"
          >
            <MdEdit
              className={`text-2xl transition duration-300 `}
            />
          </div>

          {/* Movie Title & Category */}
          <div className="absolute bottom-6 left-6">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              {movie.moviesName}
            </h1>
            <p className="text-gray-300 text-sm mt-1">{movie.category}</p>
          </div>
        </div>

        {/* Movie Info Section */}
        <div className="p-8 space-y-5">
          <p className="text-gray-300 leading-relaxed text-lg">
            {movie.description}
          </p>

          <div className="border-t border-gray-700 my-4"></div>

          {/* Book Ticket Button */}
          <div className="flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105">
              🎟️ Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MovieDetails;
