import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import Hotels from './components/Hotels/Hotels';
import RegisterForm from './components/Register/Register';
import LoginForm from './components/Login/Login';
import BedroomsList from './components/Bedrooms/Bedrooms';
import Reservation from './components/Reservation/Reservation';
import UserReservations from './Components/Reservation/userReservation';
import HotelForm from './components/Admin/Form';
import UpdateHotelForm from './components/Admin/updateHotel';
import './index.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setIsAdmin(userRole === 'Admin');
  }, []); 

  return (
    <BrowserRouter>  
      <Header />
      <Routes>
        
           <Route path='/hotels/create' element={<HotelForm />} /> 
      
          <>
            <Route index element={<Hotels />} />
             <Route path="/register" element={<RegisterForm />} /> 
            <Route path="/login" element={<LoginForm />} /> 
            <Route path="/Bedrooms" element={<BedroomsList />} /> 
            <Route path="/reservation" element={<Reservation />} />
           <Route path='/reservaciones/:username' element={<UserReservations />} />
           <Route path='/hotels/update/:id' element={<UpdateHotelForm />} />
          </>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
