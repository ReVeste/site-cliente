// src/components/ProductsGrid.jsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsProducts.css';

const products = [
  { nome: 'Ropa 1', preco: 199.90 },
  { nome: 'Ropa 2', preco: 199.90 },
  { nome: 'Ropa 3', preco: 199.90 },
  { nome: 'Ropa 4', preco: 199.90 },
];

const ProductsGrid = () => {
  return (
    <div className="products-grid">
      <div className="grid-container">
        {products.map((product, index) => (
          <ProductCard 
            key={index} 
            nome={product.nome} 
            preco={product.preco} 
            installment={3} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;