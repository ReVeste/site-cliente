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
    <div className="product-list" role="main" aria-labelledby="product-list-title">
      <div className="header">
        <img
          src={IconeVenda}
          alt="Ícone de Venda"
          className="title-image"
          aria-hidden="true"
        />
        <h1 className="title" id="product-list-title">
          à venda
        </h1>
        <div className="tabs" role="tablist">
          <button
            className={`tab ${abaAtiva === "ativos" ? "active" : ""}`}
            onClick={() => setAbaAtiva("ativos")}
            role="tab"
            aria-selected={abaAtiva === "ativos"}
            aria-controls="active-products"
            id="tab-ativos"
          >
            ativos
          </button>
          <button
            className={`tab ${abaAtiva === "inativos" ? "active" : ""}`}
            onClick={() => setAbaAtiva("inativos")}
            role="tab"
            aria-selected={abaAtiva === "inativos"}
            aria-controls="inactive-products"
            id="tab-inativos"
          >
            inativos
          </button>
        </div>
      </div>

      <div className="search-bar" role="search">
        <label htmlFor="search-input" className="visually-hidden">
          Procurar por um produto específico
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="procurando algum produto específico?"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          aria-label="Buscar produtos"
        />
        <button className="search-btn" aria-label="Executar busca">🔍</button>
      </div>

      <div
        id={abaAtiva === "ativos" ? "active-products" : "inactive-products"}
        className="product-container"
        role="tabpanel"
        aria-labelledby={abaAtiva === "ativos" ? "tab-ativos" : "tab-inativos"}
      >
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} className="item-card" role="article">
            <div className="item-image">
              {produto.imagens ? (
                <img
                  src={produto.imagens[0]}
                  alt={`Imagem do produto ${produto.nome}`}
                  className="product-image"
                />
              ) : (
                <div className="image-placeholder" aria-hidden="true">
                  Sem imagem
                </div>
              )}
            </div>
            <div className="item-info">
              <p className="post-date">
                {produto.dataPostagem ? `Postado em ${produto.dataPostagem}` : "Data de postagem não disponível"}
              </p>
              <h3 className="product-name" aria-label={`Produto: ${produto.nome}`}>
                {produto.nome}
              </h3>
              <p className="product-status" aria-label={`Status: ${getStatusLabel(produto.status)}`}>
                Status do produto: {getStatusLabel(produto.status)}
              </p>
            </div>
            <div className="product-actions">
              <button className="edit-btn" aria-label={`Editar produto ${produto.nome}`}>✏️</button>
              <button className="delete-btn" aria-label={`Excluir produto ${produto.nome}`}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lista;
