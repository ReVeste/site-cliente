import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import api from '../../Api';
import './ProductsGrid.css';
import { useLocation } from 'react-router-dom';

const ProductsGrid = () => {
  const [produtos, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  
  const location = useLocation();

  const fetchProducts = (categoria = '') => {
    const endpoint = categoria ? `/produtos/categoria?categoria=${categoria}` : '/produtos';
    
    api.get(endpoint)
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(() => {
        setError('Erro ao carregar os produtos');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/acessorios':
        fetchProducts('ACESSORIO');
        break;
      case '/produtos':
        fetchProducts('ROUPA');
        break;
      default:
        fetchProducts();
        break;
    }
  }, [location.pathname]);

  if (loading) {
    return <p role="status" aria-live="polite">Carregando produtos...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const produtosExibidos = showAll ? produtos : produtos.slice(0, 4);

  return (
    <div className="products-grid" role="region" aria-labelledby="products-heading">
      <h2 id="products-heading">Produtos Disponíveis</h2>
      {/* {showAll} */}
      {!showAll && (
        <button 
          onClick={() => setShowAll(true)} 
          aria-expanded={showAll}
          aria-controls="products-grid-container"
        >
          Ver mais
        </button>
      )}
      <div className="grid-container" id="products-grid-container" role="list">
        {Array.isArray(produtosExibidos) && produtosExibidos.map((produto) => (
          <div key={produto.id} role="listitem">
            <ProductCard 
              produto={produto} 
            />
          </div>
        ))}
      </div>    
    </div>
  );
};

export default ProductsGrid;