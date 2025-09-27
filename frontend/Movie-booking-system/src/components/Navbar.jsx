import React from 'react'
import {CgProfile} from "react-icons/cg"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-10 py-4 bg-pink-600 m-4 rounded-full sticky top-2'>
        <div className='flex items-center justify-center '>
            <h1 className='font-bold text-2xl'>BookShow</h1>
        </div>
        <div className='flex items-center justify-center '>
            <ul className='flex items-center justify-center gap-6 '>
                <li className='hover:underline transition-all duration-300 font-bold'> <Link to={"/"}> Movies </Link></li>
                <li className='hover:underline transition-all duration-300 font-bold'><Link to={"/book-movies"}>Book Movies </Link></li>
                <li className='hover:underline transition-all duration-300 font-bold'><Link to={"/add-movie"}>Add Movie </Link></li>
                <li className='hover:underline transition-all duration-300 font-bold'><Link to={"/profile/:id"}>{<CgProfile/> ? <CgProfile size={25}/> : "Profile"} </Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar