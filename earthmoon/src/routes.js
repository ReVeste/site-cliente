import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
    
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;