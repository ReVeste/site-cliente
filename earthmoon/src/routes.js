// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';g
import Accessories from './pages/Accessories/Accessories';
import Products from './pages/Products/Products';
import Home from './pages/Home/Home';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;