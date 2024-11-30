import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './DetalheProdutos.css';
import IconePagamento from '../../assets/pagamento.png';
import ImagemEspecificacoes from '../../assets/tabelaMedida.png';
import api from '../../Api';

const idUsuario = sessionStorage.getItem("userId");

const DetalheProdutos = ({ onAddToCart }) => {
  const [isEspecificacoes, setIsEspecificacoes] = useState(true);
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentCard, setShowPaymentCard] = useState(false);

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
      try {
        setLoading(true);

        const response = await api.post('/pedidos', {
          idUsuario: idUsuario,
          idProduto: produto.id,
          quantidadeProduto: 1,
        });

        console.log('Produto adicionado ao carrinho:', response.data);
        onAddToCart(produto); 
      } catch (error) {
        console.error('Erro ao adicionar o produto ao carrinho:', error.response?.data);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className="detalhe-produto">
      <div className="topo">
        <div className="galeria">
          <div className="imagem-principal">
            <img src={produto.imagens[0]} alt="Imagem Principal" />
          </div>
          <div className="coluna-imagens">
            {produto.imagens && produto.imagens.length > 1 && (
              <img src={produto.imagens[1]} alt="Imagem Secundária 1" />
            )}
            {produto.imagens && produto.imagens.length > 2 && (
              <img src={produto.imagens[2]} alt="Imagem Secundária 2" />
            )}
            {produto.imagens && produto.imagens.length > 3 && (
              <img src={produto.imagens[3]} alt="Imagem Secundária 3" />
            )}
          </div>
        </div>
        <div className="detalhe-info">
          <h2 className="titulo-produto">{produto.nome}</h2>
          <div className="preco-parcelamento">
            <p className="preco">R$ {produto.preco.toFixed(2)}</p>
            <p className="parcelamento">3x de R$ {(produto.preco / 3).toFixed(2)} sem juros</p>
          </div>
          <p className="detalhe-tamanho-cor">Tamanho {produto.tamanho}</p>
          <button className="botao-comprar" onClick={handleAddToCart}>Comprar</button>
          <div
            className="meios-pagamento"
            onMouseEnter={() => setShowPaymentCard(true)}
            onMouseLeave={() => setShowPaymentCard(false)}
          >
            <img src={IconePagamento} alt="Ícone de pagamento" className="icone-pagamento" />
            <span>Meios de pagamento</span>
            {showPaymentCard && (
              <div className="payment-card">
                <p><strong>Cartão de crédito e débito:</strong> Aceitamos as principais bandeiras como Visa, MasterCard, Elo, American Express, entre outras.</p>
                <p><strong>Pix:</strong> Pagamento instantâneo para maior agilidade.</p>
                <p><strong>Boleto bancário:</strong> Disponível para quem prefere pagamentos tradicionais.</p>
                <p><strong>Carteira do Mercado Pago:</strong> Use seu saldo na conta do Mercado Pago para pagar.</p>
                <p><strong>Parcelamento:</strong> Oferecemos a possibilidade de parcelamento (se aplicável), com ou sem juros, dependendo do valor e da oferta.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="informacoes-adicionais">
        <div className="detalhe-toggle">
          <h3 
            className={`toggle-option ${isEspecificacoes ? 'active' : ''}`} 
            onClick={() => toggleDetalhe('especificacoes')}
          >
            Especificações
          </h3>
          <h3 
            className={`toggle-option ${!isEspecificacoes ? 'active' : ''}`} 
            onClick={() => toggleDetalhe('caracteristicas')}
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