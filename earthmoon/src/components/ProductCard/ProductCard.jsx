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
    <div className="product-card" role="region" aria-labelledby={`produto-${produto.id}`}>
      <div className="product-image" role="figure" aria-labelledby={`imagem-${produto.id}`}>
        {isLoading && <div className="image-placeholder" role="status" aria-live="polite">Carregando...</div>}
        <img 
          src={produto.imagens[0]} 
          alt={`Imagem do produto ${produto.nome}`} 
          style={{ cursor: 'pointer' }} 
          onClick={handleClick} 
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          aria-describedby={`descricao-${produto.id}`}
        /> 
      </div>
      <div className="product-info">
        <h3 id={`produto-${produto.id}`}>{produto.nome}</h3>
        <p id={`descricao-${produto.id}`}>{`R$${produto.preco.toFixed(2)}`}</p>
        <p>{`3x de R$${(produto.preco / 3).toFixed(2)} sem juros`}</p>
      </div>
    </div>
  );
};

export default ProductCard;