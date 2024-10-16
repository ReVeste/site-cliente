// src/components/ProductsGrid.jsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsProducts.css';

const products = [
  { name: 'Ropa 1', price: 199.90 },
  { name: 'Ropa 2', price: 199.90 },
  { name: 'Ropa 3', price: 199.90 },
  { name: 'Ropa 4', price: 199.90 },
];

const ProductsGrid = () => {
  return (
    <div className="products-grid">
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