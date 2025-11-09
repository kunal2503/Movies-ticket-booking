import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import MainLayout from "./layout/MainLayout";
import {ToastContainer} from "react-toastify";


const App = () => {
  return (
    <div> 
      <ToastContainer position="top-right" autoClose={4000} />
    <BrowserRouter>
      <Routes>

        {/* Public Routes (Auth) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected / Main App Routes */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
