import React from 'react';
import Navbar from '../../components/Navbar/Navbar'; 
import Carrossel from '../../components/Carrossel/Carrossel';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';

const Products = () => {
  return (
    <div>
      <Navbar />
      <ProductsGrid/>
    </div>
  );
};

export default Products;