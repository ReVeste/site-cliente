import React, { useState, useEffect } from "react";
import "./ListaEduarda.css";
import IconeVenda from "../../assets/shop.png";
import api from "../../Api";

const ListaEduarda = () => {
  const [pedidos, setPedidos] = useState([]);
  // const [busca, setBusca] = useState("");
  const [busca] = useState("");
  const [hoveredPedidoId, setHoveredPedidoId] = useState(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await api.get(`/pedidos/buscar-pedido-pago`);
      const pedidos = response.data;
  
      if (Array.isArray(pedidos)) {
        setPedidos(pedidos);
        console.log("Pedidos em aberto: ", pedidos);
      } else {
        setPedidos([]);
        console.log("Nenhum pedido encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos em aberto:", error.response?.data || error.message);
      setPedidos([]);
    }
  };  

  const pedidosFiltrados = Array.isArray(pedidos)
    ? pedidos.filter((pedido) =>
      pedido.usuario.nome.toLowerCase().includes(busca.toLowerCase())
    )
    : [];

  const handleMouseEnter = (id) => {
    setHoveredPedidoId(id);
  };

  const handleMouseLeave = () => {
    setHoveredPedidoId(null);
  };

  const concluirPedido = async () => {
    try {
      // const response = await api.put('pedidos/finalizar');
      // fetchPedidos();
    } catch (error) {
      console.error('Erro ao concluir um Pedido:', error.response?.data || error.message);
    }
  }

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
          <button className="buttonConcluir" onClick={concluirPedido}>Concluir 1º pedido</button>
        </div>
      </div>

      <div className="product-container">
        {pedidosFiltrados.map((pedido) => (
          <div
            key={pedido.id}
            className={`item-card ${hoveredPedidoId === pedido.id ? "expanded" : ""}`}
            onMouseEnter={() => handleMouseEnter(pedido.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="item-image">
              {pedido.produtos && pedido.produtos.length > 0 ? (
                <div className="product-images">
                  {pedido.produtos.map((produto, index) => (
                    produto.imagens && produto.imagens.length > 0 ? (
                      <img
                        key={produto.id || index}
                        src={produto.imagens[0]}
                        alt={produto.nome || "Produto sem nome"}
                        className="product-image"
                        onError={(e) => e.target.src = '/placeholder.jpg'}
                      />
                    ) : (
                      <div key={produto.id || index} className="image-placeholder">Sem imagem</div>
                    )
                  ))}
                </div>
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
              <p className="post-date">
                Data do pedido: {pedido.dataHora ? new Date(pedido.dataHora).toLocaleDateString('pt-BR') : "Não disponível"}
              </p>
              <h3 className="product-name">Produtos:</h3>
              <ul className="product-list">
                {pedido.produtos.map((produto, index) => (
                  <li key={index} className="product-item">
                    {produto.nome} - {produto.quantidade || 1} unidade(s)
                  </li>
                ))}
              </ul>

              {hoveredPedidoId === pedido.id && (
                <div className="additional-info">
                  <p>Comprador: {pedido.usuario.nome || "Desconhecido"}</p>
                  <p>Contato: {pedido.usuario.telefone || "Não informado"}</p>
                  <p>
                    Endereço: {pedido.endereco
                      ? `${pedido.endereco.rua || "S/N"}, ${pedido.endereco.numero || "S/N"}, ${pedido.endereco.complemento || "S/N"},
                       ${pedido.endereco.bairro || "S/N"} | ${pedido.endereco.cidade || "Cidade não informada"} - ${pedido.endereco.uf || "S/N"} | ${pedido.endereco.cep || "CEP não informado"}`
                      : "Não Cadastrado"}
                  </p>
                  <p>Valor Total: {pedido.valorTotal ? `R$ ${pedido.valorTotal}` : "Valor não disponível"}</p>
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
