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
    return <p>Carregando produtos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const produtosExibidos = showAll ? produtos : produtos.slice(0, 4);

  return (
    <div className="products-grid">
      <h2>Disponíveis</h2>
      {!showAll && (
        <button onClick={() => setShowAll(true)}>Ver mais</button>
      )}
      <div className="grid-container">
      {Array.isArray(produtosExibidos) && produtosExibidos.map((produto) => (
  <div key={produto.id}>
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