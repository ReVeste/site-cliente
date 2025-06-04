import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import './DetalheProdutos.css';
import PilhaObj from '../../Utils/PilhaObj';
import IconePagamento from '../../assets/pagamento.png';
import ImagemEspecificacoes from '../../assets/tabelaMedida.png';
import api from '../../Api';

const idUsuario = sessionStorage.getItem("userId");

  const DetalheProdutos = ({ onAddToCart }) => {

  const [pilha, setPilha] = useState(new PilhaObj(30));
  const [isEspecificacoes, setIsEspecificacoes] = useState(true);
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupLoginVisible, setPopupLoginVisible] = useState(false);
  const [idPedido, setIdPedido] = useState(0);

  const toggleDetalhe = (detalhe) => {
    setIsEspecificacoes(detalhe === 'especificacoes');
  };

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  const handleAddToCart = async () => {
    if (produto) {

      if (!idUsuario) {

        setPopupLoginVisible(true);

        setTimeout(() => {
          setPopupLoginVisible(false);
        }, 10000);

      } else {

        try {
          setLoading(true);
  
          const response = await api.post('/pedidos', {
            idUsuario: idUsuario,
            idProduto: produto.id,
            quantidadeProduto: 1,
          });
          
          pilha.push(produto.id);
          setPilha(new PilhaObj(30, pilha.pilha, pilha.topo));
          console.log("O que tem na pilha: ");
          pilha.exibe();
          setIdPedido(response.data.id);
          setPopupVisible(true);
  
          setTimeout(() => {
            setPopupVisible(false);
          }, 10000);
  
          console.log('Produto adicionado ao carrinho:', response.data);
          onAddToCart(produto); 
        } catch (error) {
          console.error('Erro ao adicionar o produto ao carrinho:', error.response?.data);
        } finally {
          setLoading(false);
        }

      }
    }
  };
  
  const handleUndo = async () => {

      console.log("ID PEDIDO = " + idPedido + " ID PRODUTO " + id);
      setPopupVisible(false);

      try {
        await api.delete(`pedidos/${idPedido}/produto/${id}`);
        setPilha(new PilhaObj(30, pilha.pilha, pilha.topo));
      } catch (error) {
        console.error('Erro ao remover o item:', error.response?.data);
      }

  }

  if (loading) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className="detalhe-produto" role="main">
      <div className="topo">
        <div className="galeria">
          <div className="imagem-principal" aria-labelledby="imagem-principal">
            <img src={produto.imagens[0]} alt="Imagem Principal do Produto" />
          </div>
          <div className="coluna-imagens" role="list" aria-labelledby="outras-imagens">
            {produto.imagens && produto.imagens.length > 1 && (
              <img src={produto.imagens[1]} alt="Imagem Secundária 1" role="listitem" />
            )}
            {produto.imagens && produto.imagens.length > 2 && (
              <img src={produto.imagens[2]} alt="Imagem Secundária 2" role="listitem" />
            )}
            {produto.imagens && produto.imagens.length > 3 && (
              <img src={produto.imagens[3]} alt="Imagem Secundária 3" role="listitem" />
            )}
          </div>
        </div>
        <div className="detalhe-info" aria-labelledby="detalhe-produto">
          <h2 className="titulo-produto" id="detalhe-produto">{produto.nome}</h2>
          <div className="preco-parcelamento">
            <p className="preco">R$ {produto.preco.toFixed(2)}</p>
          </div>
          <p className="detalhe-tamanho-cor">Tamanho {produto.tamanho}</p>
          <button className="botao-comprar" onClick={handleAddToCart}>Adicionar ao Carrinho</button>
          <div
            className="meios-pagamento"
            onMouseEnter={() => setShowPaymentCard(true)}
            onMouseLeave={() => setShowPaymentCard(false)}
            aria-haspopup="true"
            aria-expanded={showPaymentCard}
          >
            <img src={IconePagamento} alt="Ícone de pagamento" className="icone-pagamento" />
            <span>Meios de pagamento</span>
            {showPaymentCard && (
              <div className="payment-card" role="dialog" aria-labelledby="detalhe-pagamento">
                <p id="detalhe-pagamento">
                  <p><strong>Carteira do Mercado Pago:</strong> Use seu saldo na conta do Mercado Pago para pagar.</p>
                 <p><strong>Pix:</strong> Pagamento instantâneo para maior agilidade.</p>
                  <strong>Cartão de crédito e débito:</strong> Aceitamos as principais bandeiras como Visa, MasterCard, Elo, American Express e Hipercard, além do virtual CAIXA.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {popupLoginVisible && (
        <div className="popupLogin-message">Ops! Para adicionar produtos ao carrinho, é necessário estar logado.<br/>
         Faça login ou crie uma conta para continuar suas compras.</div>
      )}

      {popupVisible && (
          <div className="popupUndo-message">
            Produto adicionado ao carrinho com sucesso!<br/>
            Deseja desfazer essa ação?<br/>
            <button className="red-round-button" onClick={handleUndo}>Desfazer</button>
          </div>
          )}

      <div className="informacoes-adicionais">
        <div className="detalhe-toggle">
          <h3 
            className={`toggle-option ${isEspecificacoes ? 'active' : ''}`} 
            onClick={() => toggleDetalhe('especificacoes')}
            tabIndex="0"
            role="tab"
            aria-selected={isEspecificacoes}
          >
            Especificações
          </h3>
          <h3 
            className={`toggle-option ${!isEspecificacoes ? 'active' : ''}`} 
            onClick={() => toggleDetalhe('caracteristicas')}
            tabIndex="0"
            role="tab"
            aria-selected={!isEspecificacoes}
          >
            Características
          </h3>
          <div className={`underline ${isEspecificacoes ? 'especificacoes' : 'caracteristicas'}`}></div>
        </div>
        
        {isEspecificacoes ? (
          <div className="detalhe-especificacoes">
            <img src={ImagemEspecificacoes} alt="Especificações do Produto" />
          </div>
        ) : (
          <div className="detalhe-caracteristicas">
            <p>{produto.descricao}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalheProdutos;