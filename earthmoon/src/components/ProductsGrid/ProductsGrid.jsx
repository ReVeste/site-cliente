// src/components/ProductsGrid.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import api from '../../Api';
import './ProductsGrid.css';

const ProductsGrid = () => {

  const [produtos, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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

  return (
    <div className="products-grid">
      <h2>Disponíveis</h2>
      <button>Ver mais</button>
      <div className="grid-container">
        {produtos.map((produto) => (
          <div key={produto.id}>
          <ProductCard 
            nome={produto.nome} 
            preco={produto.preco} 
            parcelas={3}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
