import React from 'react'
import {CgProfile} from "react-icons/cg"
// import MoviesImage   from "../../public"

const Movies = () => {
  return (
    <div className='flex items-cneter justify-center w-full  border flex-col overflow-hidden border-gray-800 rounded-sm ' >
        <div className='flex  items-center justify-center'>
            {/* <CgProfile size={40}/> */}
        <img src="/356881-3840x2160-desktop-4k-captain-marvel-movie-wallpaper.jpg" alt="" className=''/>
        </div>
        <div className=' flex flex-col ml-2'>
        <h2 className='font-bold text-2xl md:text-xl'>Captain marvel</h2>
        <p className='font-mono'>Action, Thiler</p>
        </div>  
        <button className='rounded-md bg-pink-600 hover:bg-pink-700 outline-none  font-bold px-10 py-2 m-4'>
            Book Tiket
        </button>

    </div>
  )
}

export default Movies