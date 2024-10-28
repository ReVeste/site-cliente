import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa o Link
import './DetalheProdutos.css';
import IconePagamento from '../../assets/pagamento.png';
import ImagemEspecificacoes from '../../assets/tabelaMedida.jpg';

const DetalheProdutos = () => {
  const [isEspecificacoes, setIsEspecificacoes] = useState(true);

  const toggleDetalhe = (detalhe) => {
    setIsEspecificacoes(detalhe === 'especificacoes');
  };

  return (
    <div className="detalhe-produto">
      <div className="topo">
        <div className="galeria">
          <div className="imagem-principal">
            <img src="imagem1.jpg" alt="Imagem Principal" />
          </div>
          <div className="coluna-imagens">
            <img src="imagem2.jpg" alt="Imagem Secundária 1" />
            <img src="imagem3.jpg" alt="Imagem Secundária 2" />
            <img src="imagem4.jpg" alt="Imagem Secundária 3" />
          </div>
        </div>
        <div className="detalhe-info">
          <h2 className="titulo-produto">Manga Longa Oversized Empalador</h2>
          <div className="preco-parcelamento">
            <p className="preco">R$219,90</p>
            <p className="parcelamento">3x de R$73,30 sem juros</p>
          </div>
          <p className="detalhe-tamanho-cor">Tamanho G, Cor: Preta</p>
          <button className="botao-comprar">Comprar</button>
          <div className="meios-pagamento">
            <img src={IconePagamento} alt="Ícone de pagamento" className="icone-pagamento" />
            <Link to="/meios-de-pagamento" style={{ color: '#000', textDecoration: 'none' }}>
              <span>Meios de pagamento</span>
            </Link>
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
            <img src={ImagemEspecificacoes} alt="Especificações do Produto"/>
          </div>
        ) : (
          <div className="detalhe-caracteristicas">
            <p>Descrição das características do produto.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalheProdutos;