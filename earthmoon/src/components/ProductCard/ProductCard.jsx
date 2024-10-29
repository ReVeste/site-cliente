import React from 'react';
import './ProductCard.css';
import testeImage from '../../assets/teste.jpg';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ produto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produto/${produto.id}`);
  };


  return (
    <div className="product-card">
      <div className="product-image">
        <img src={produto.imagens[0]} alt="Produto" style={{cursor: 'pointer'}} onClick={handleClick} /> 
      </div>
      <div className="product-info">
        <h3>{produto.nome}</h3>
        <p>{`R$${produto.preco.toFixed(2)}`}</p>
        <p>{`3x de R$${(produto.preco / 3).toFixed(2)} sem juros`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
