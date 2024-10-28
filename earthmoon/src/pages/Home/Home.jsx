import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import Carrossel from '../../components/Carrossel/Carrossel';
import Footer from '../../Footer/Footer';


const Home = () => {
  return (
    <div>
      <Navbar />
      <ProductsGrid />
      <Carrossel />
      <Footer />
    </div>
  );
};

export default Home;
