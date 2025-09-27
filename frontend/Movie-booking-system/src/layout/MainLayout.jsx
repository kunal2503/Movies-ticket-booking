import React from 'react'
import Navbar from "../components/Navbar"
import { Route, Routes } from 'react-router-dom'
import MoviesListing from  "../pages/MoviesListing"
import Footer from '../components/Footer'
import AddMovie from "../components/AddMovie"

const MainLayout = () => {
  return (
    <div>
        <Navbar/>
        <div>
          <Routes>
            <Route path='/' element={<MoviesListing/>} />
            <Route path='/add-movie' element={<AddMovie/>} />
          </Routes>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout