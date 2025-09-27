import React from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Signup from './pages/Signup';
import Signin from "./pages/Signin"
import MainLayout from './layout/MainLayout';

const App = () => {

return (
    <BrowserRouter>
      <Routes>
          <Route path='*'element={<MainLayout/>}  />
          <Route path='/signup'element={<Signup/>}  />
          <Route path='/signin' element={<Signin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App