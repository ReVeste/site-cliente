import React, { useState, useEffect } from 'react';
import './Lista.css';
import IconeVenda from '../../assets/shop.png';
import api from '../../Api';

const Lista = () => {
  const [produtosAtivos, setProdutosAtivos] = useState([]);
  const [produtosInativos, setProdutosInativos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("ativos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api.get('/produtos')
      .then(response => {
        console.log(response.data);
        const ativos = response.data.filter(produto => produto.status !== "VENDIDO");
        const inativos = response.data.filter(produto => produto.status === "VENDIDO");
        setProdutosAtivos(ativos);
        setProdutosInativos(inativos);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  const produtosFiltrados = (abaAtiva === "ativos" ? produtosAtivos : produtosInativos)
    .filter(produto => produto.nome.toLowerCase().includes(busca.toLowerCase()));

    const statusLabels = {
      DISPONIVEL: "Disponível",
      RESERVADO: "Reservado",
      VENDIDO: "Vendido",
    };
    
    function getStatusLabel(status) {
      return statusLabels[status] || "Status desconhecido";
    }

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
        <input
          type="text"
          placeholder="procurando algum produto específico?"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>

      <div className="product-container">
  {produtosFiltrados.map((produto) => (
    <div key={produto.id} className="item-card">
      <div className="item-image">
        {produto.imagens ? (
          <img src={produto.imagens[0]} alt={produto.nome} className="product-image" />
        ) : (
          <div className="image-placeholder">Sem imagem</div>
        )}
      </div>
      <div className="item-info">
        <p className="post-date">{produto.dataPostagem}</p> {/* não tem data de postagem no banco, tem que adicionar*/}
        <h3 className="product-name">{produto.nome}</h3>
        <p className="product-status">
          Status do produto: {getStatusLabel(produto.status)}
        </p>
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
