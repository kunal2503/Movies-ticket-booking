import React from 'react'

const AddMovie = () => {
  return (
    <form className='flex items-center justify-center flex-col' >
      <h1 className='text-2xl font-bold'>Add New Movies</h1>
      <div>
        <div className='flex flex-col'>
          <label htmlFor="movieName">Movies Name</label>
          <input type="text" name="movieName" placeholder='Enter Movies name' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="movieName">Select Category</label>
          <select name="category" id="category" >
            <option value="1" >Action</option>
            <option value="2">Crime</option>
            <option value="2">Adventure</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="movieName">Description</label>
          <input type="text" name="movieName" placeholder='Enter short description' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="images">Images</label>
          <input type="file" placeholder='upload images' className='bg-gray-100 px-2 py-2 rounded-sm'/>
        </div>
      </div>
      <button className='bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md m-2'>Add movie</button>
    </form>
  )
}

export default AddMovie