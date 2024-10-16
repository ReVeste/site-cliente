import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import Carrossel from '../../components/Carrossel/Carrossel';


const Home = () => {
  return (
    <div>
      <Navbar />
      <ProductsGrid />
      <Carrossel />
    </div>
  );
};

export default Home;
