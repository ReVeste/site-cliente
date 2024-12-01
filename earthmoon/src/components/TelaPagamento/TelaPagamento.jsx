import React, { useState } from "react";
import "./TelaPagamento.css";

function TelaPagamento() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("Minha Casa");

  const handleContinue = () => {
    alert(`Pedido enviado com sucesso!\nE-mail: ${email}\nTelefone: ${phone}\nEndereço: ${address}`);
  };

  return (
    <div className="containerPagamento">
      <main className="content">
        <div className="progress-bar">
          <span className="step completed">Carrinho</span>
          <span className="step active">Entrega</span>
          <span className="step">Pagamento</span>
        </div>

        <div className="form-section">
          <div className="contact-info">
            <h2>Dados de Contato</h2>
            <form>
              <label>
                E-mail:
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Telefone:
                <input
                  type="tel"
                  placeholder="Digite seu telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </form>
          </div>

          <div className="delivery-address">
            <h2>Escolher Endereço de Entrega</h2>
            <select
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              <option value="Minha Casa">Minha Casa</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        <div className="order-summary">
          <h2>Resumo do Pedido</h2>
          <div className="item">
            <img
              src="https://via.placeholder.com/50"
              alt="Produto"
            />
            <p>Vestido (Preto, P) - R$ 89,90 </p>
          </div>
          <div className="summary">
            <p>Subtotal: R$ 89,90</p>
            <p>Frete: R$ 0,00</p>
            <h3>Total: R$ 89,90</h3>
             <button className="btn-continue" onClick={handleContinue}>
          Continuar
        </button>
          </div>
        
        </div>
      </main>
    </div>
  );
}

export default TelaPagamento;
