import React, { useState, useEffect } from "react";
import "./ListaEduarda.css";
import IconeVenda from "../../assets/shop.png";
import api from "../../Api";

const ListaEduarda = () => {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [hoveredProdutoId, setHoveredProdutoId] = useState(null); // Estado para armazenar o ID do produto em foco

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
    setHoveredProdutoId(id); // Define o ID do produto em foco
  };

  const handleMouseLeave = () => {
    setHoveredProdutoId(null); // Limpa o foco
  };

  return (
    <div className="product-list">
      <div className="header">
        <img src={IconeVenda} alt="Ícone de Venda" className="title-image" />
        <h1 className="title">Pedidos em aberto</h1>
        <div className="tabs">
          <button className="tab">Mais Pedidos</button>
        </div>
      </div>

      <div className="product-container">
        {produtosFiltrados.map((produto) => (
          <div
            key={produto.id}
            className={`item-card ${
              hoveredProdutoId === produto.id ? "expanded" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(produto.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="item-image">
              {produto.imagens ? (
                <img
                  src={produto.imagens[0]}
                  alt={produto.nome}
                  className="product-image"
                />
              ) : (
                <div className="image-placeholder">Sem imagem</div>
              )}
            </div>
            <div className="item-info">
              <p className="post-date">
                {produto.dataPostagem || "Data do pedido: "}
              </p>
              <h3 className="product-name">{produto.nome}</h3>
              {hoveredProdutoId === produto.id && (
                <div className="additional-info">
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