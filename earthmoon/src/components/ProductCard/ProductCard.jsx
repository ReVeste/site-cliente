import React from 'react';
import './ProductCard.css';
import testeImage from '../../assets/teste.jpg';

const ProductCard = ({ name, price, installment }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={testeImage} alt="Produto" /> 
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p>{`R$${price.toFixed(2)}`}</p>
        <p>{`3x de R$${(price / 3).toFixed(2)} sem juros`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
