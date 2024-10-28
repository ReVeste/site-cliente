import React from 'react';
import Navbar from '../../components/Navbar/Navbar'; 
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import Footer from '../../Footer/Footer';

const Products = () => {
  return (
    <div>
      <Navbar />
      <ProductsGrid/>
      <Footer />
    </div>
  );
};

export default Products;