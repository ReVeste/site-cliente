// src/components/ProductsGrid.jsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsGrid.css';

const products = [
  { name: 'Ropa', price: 199.90 },
  { name: 'Ropa', price: 199.90 },
  { name: 'Ropa', price: 199.90 },
  { name: 'Ropa', price: 199.90 },
];

const ProductsGrid = () => {
  return (
    <div className="products-grid">
      <h2>Disponíveis</h2>
      <button>Ver mais</button>
      <div className="grid-container">
        {products.map((product, index) => (
          <ProductCard 
            key={index} 
            name={product.name} 
            price={product.price} 
            installment={3} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
