import React, { useState } from 'react';
import './Lista.css';
import IconeVenda from '../../assets/shop.png';


const produtosAtivos = [
  { id: 1, dataPostagem: 'dia da postagem', nome: 'saia verde limão', status: 'vendido' },
  { id: 2, dataPostagem: 'dia da postagem', nome: 'saia verde limão', status: 'em aberto' },
  { id: 3, dataPostagem: 'dia da postagem', nome: 'saia verde limão', status: 'esperando pagamento' },
  { id: 5, dataPostagem: 'dia da postagem', nome: 'camisa branca', status: 'vendido' },
  { id: 6, dataPostagem: 'dia da postagem', nome: 'calça jeans', status: 'em aberto' },
  { id: 7, dataPostagem: 'dia da postagem', nome: 'jaqueta preta', status: 'esperando pagamento' },
];

const produtosInativos = [
  { id: 4, dataPostagem: 'dia da postagem', nome: 'saia azul marinho', status: 'indisponível' },
];

const Lista = () => {
  const [abaAtiva, setAbaAtiva] = useState("ativos");

  const produtos = abaAtiva === "ativos" ? produtosAtivos : produtosInativos;

  return (
    <div className="product-list">
      <div className="header">
  <img src={IconeVenda} alt="Ícone de Venda" className="title-image" />
  <h1 className="title">à venda</h1>
  <div className="tabs">
    <button
      className={`tab ${abaAtiva === "ativos" ? "active" : ""}`}
      onClick={() => setAbaAtiva("ativos")}
    >
      ativos
    </button>
    <button
      className={`tab ${abaAtiva === "inativos" ? "active" : ""}`}
      onClick={() => setAbaAtiva("inativos")}
    >
      inativos
    </button>
  </div>
</div>

      <div className="search-bar">
        <input type="text" placeholder="procurando algum produto específico?" />
        <button className="search-btn">🔍</button>
      </div>
      <div className="product-container">
        {produtos.map((produto) => (
          <div key={produto.id} className="item-card">
            <div className="item-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="item-info">
              <p className="post-date">{produto.dataPostagem}</p>
              <h3 className="product-name">{produto.nome}</h3>
              <p className="product-status">status do produto ({produto.status})</p>
            </div>
            <div className="product-actions">
              <button className="edit-btn">✏️</button>
              <button className="delete-btn">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lista;
