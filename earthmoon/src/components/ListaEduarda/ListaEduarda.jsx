import React, { useState, useEffect } from "react";
import "./ListaEduarda.css";
import IconeVenda from "../../assets/shop.png";
import api from "../../Api";

const ListaEduarda = () => {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [hoveredProdutoId, setHoveredProdutoId] = useState(null);

  useEffect(() => {
    api
      .get("/produtos")
      .then((response) => {
        console.log(response.data);
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleMouseEnter = (id) => {
    setHoveredProdutoId(id);
  };

  const handleMouseLeave = () => {
    setHoveredProdutoId(null);
  };

  return (
    <div className="product-list" role="main" aria-labelledby="lista-pedidos">
      <div className="header">
        <img
          src={IconeVenda}
          alt="Ícone de Venda"
          className="title-image"
          aria-hidden="true"
        />
        <h1 id="lista-pedidos" className="title">
          Pedidos em aberto
        </h1>
        <div className="tabs">
          <button className="tab" aria-label="Ver mais pedidos">
            Mais Pedidos
          </button>
        </div>
      </div>

      <div className="product-container" role="list" aria-label="Lista de produtos">
        {produtosFiltrados.map((produto) => (
          <div
            key={produto.id}
            className={`item-card ${
              hoveredProdutoId === produto.id ? "expanded" : ""
            }`}
            role="listitem"
            aria-labelledby={`produto-${produto.id}`}
            onMouseEnter={() => handleMouseEnter(produto.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="item-image">
              {produto.imagens ? (
                <img
                  src={produto.imagens[0]}
                  alt={`Imagem do produto ${produto.nome}`}
                  className="product-image"
                />
              ) : (
                <div
                  className="image-placeholder"
                  role="img"
                  aria-label="Imagem não disponível"
                >
                  Sem imagem
                </div>
              )}
            </div>
            <div className="item-info">
              <p className="post-date" aria-label={`Data do pedido: ${produto.dataPostagem || "Não informada"}`}>
                {produto.dataPostagem || "Data do pedido: Não informada"}
              </p>
              <h3 id={`produto-${produto.id}`} className="product-name">
                {produto.nome}
              </h3>
              {hoveredProdutoId === produto.id && (
                <div
                  className="additional-info"
                  role="region"
                  aria-labelledby={`produto-${produto.id}`}
                >
                  <p>Comprador: {produto.comprador || "Desconhecido"}</p>
                  <p>Contato: {produto.contato || "Não informado"}</p>
                  <p>Endereço: {produto.endereco || "Não disponível"}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaEduarda;