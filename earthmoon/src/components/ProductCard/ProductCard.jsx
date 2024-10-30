import React, { useState } from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ produto }) => {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    navigate(`/produto/${produto.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {isLoading && <div className="image-placeholder">Carregando...</div>}
        <img 
          src={produto.imagens[0]} 
          alt="Produto" 
          style={{ cursor: 'pointer' }} 
          onClick={handleClick} 
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        /> 
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