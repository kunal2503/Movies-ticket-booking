import React, { useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { Link } from 'react-router-dom'

const Signin = () => {
    const [userData, setUserData] = useState({
        email : "",
        password : ""
    })

    const handleChanges =  (e) =>{
        setUserData({...userData,[e.target.name ]: e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response =  await axiosInstance.post("/auth/signin",userData);
            console.log(response);
        } catch(error){
            console.log(error);
        }
    }
  return (
    <div className='flex items-center justify-center flex-col border-1 border-gray-700 w-screen h-screen'>
        <h1 className='font-bold text-2xl mb-4'>Signin</h1>
        <div className='flex  flex-col gap-2 items-center justify-center'>
             <div className='flex flex-col '>
            <label htmlFor="email"  className='font-light'>Enter Email</label>
            <input onChange={handleChanges} type="email" className='px-12 rounded-sm  py-2 border border-gray-600 outline-none' placeholder='Enter email' name='email' id='email' value={userData.email}/>
            </div>
             <div className='flex flex-col '>
            <label htmlFor="password" className='font-light'>Enter password</label>
            <input onChange={handleChanges} type="password" className='px-12 rounded-sm  py-2 border border-gray-600 outline-none' placeholder='Enter Password' name='password' id='password' value={userData.password}/>
            </div>
            <button onClick={handleSubmit} className='px-8 py-2 font-bold bg-cyan-700  hover:bg-cyan-800'>Signup</button>
        </div>
        <p>Not have an account <Link className='text-blue-600 font-bold' to={"/signup"}>SignUp</Link></p>
    </div>
  )
}

export default Signin