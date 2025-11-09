import React, { useState} from "react";
import { Camera, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const {id} =  useParams();
  const [userInfo,setUserInfo] = useState({
    email :"",
    username : "",
    profileImage : null
  });
  


  const handleChanges = (e) =>{
    const { name, value, files } = e.target;
    setUserInfo({
      ...userInfo, [name] : files ? files[0] : value
    })
  }
  

  

  const handleSave = async(e) => {
    e.preventDefault();
    try { 
        const formData =  new FormData();
        formData.append("email",userInfo.email)
        formData.append("username",userInfo.username)
        formData.append("profileImage",userInfo.profileImage)

        const response =  await axiosInstance.put(`/users/edit-user/${id}`,formData,{
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success(response.data.message || "User information updated successfully");
      navigate(`/profile/${id}`);
    } catch(error){
      console.log(error);
      toast.error("Internal server error");
    }
  };

  const handleCancel = () => {
      navigate(`/profile/${id}`)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 space-y-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-3 ">
          <div className="relative">
            {userInfo.profileImage ? (
              <img
                src={URL.createObjectURL(userInfo.profileImage)}
                alt="Profile Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={42} className="text-gray-600" />
              </div>
            )}

            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer shadow-md"
            >
              <Camera size={18} className="text-white" />
            </label>
            <input
              id="profileImage"
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChanges}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-gray-700 pt-2">
          <label htmlFor="email" className="text-gray-300 font-medium">
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChanges}
            placeholder="Enter your Username"
            className={`px-4 py-2 rounded-lg border  border-gray-700
            bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </div>


        <div className="flex flex-col gap-1 ">
          <label htmlFor="email" className="text-gray-300 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email }
            onChange={handleChanges}
            placeholder="Enter your email"
            className={`px-4 py-2 rounded-lg border  border-gray-700
            bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 pt-4  border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCancel}
            className="rounded-xl px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
