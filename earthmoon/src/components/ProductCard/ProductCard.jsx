import React from 'react';
import './ProductCard.css';
import testeImage from '../../assets/teste.jpg';

const ProductCard = ({ nome, preco, parcelas, image }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={testeImage} alt="Produto" /> 
      </div>
      <div className="product-info">
        <h3>{nome}</h3>
        <p>{`R$${preco.toFixed(2)}`}</p>
        <p>{`${parcelas}x de R$${(preco / 3).toFixed(2)} sem juros`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
