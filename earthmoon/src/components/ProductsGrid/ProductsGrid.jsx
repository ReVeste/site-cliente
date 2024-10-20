import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import api from '../../Api';
import './ProductsGrid.css';

const ProductsGrid = () => {
  const [produtos, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    api.get(`http://localhost:8080/produtos`)
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erro ao carregar os produtos');
        setLoading(false);
      });
  }, []);

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
        {produtosExibidos.map((produto) => (
          <div key={produto.id}>
            <ProductCard 
              nome={produto.nome} 
              preco={produto.preco} 
              parcelas={3} />
          </div>
        ))}
      </div>    
    </div>
  );
};

export default ProductsGrid;