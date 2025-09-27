import React from 'react'
import Movies from '../components/Movies'

const MoviesListing = () => {
  return (
    
    <div className='grid grid-cols-1 justify-self-center items-center gap-4 md:grid-cols-3 px-10 py-5 w-10/12 '>

        <Movies/>
        <Movies/>
        <Movies/>
        <Movies/>
      
    </div>
  )
}

export default MoviesListing