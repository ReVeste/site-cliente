import React, { useEffect, useState } from "react";
import "./TelaPagamento.css";
import api from "../../Api";
import Pagamento from '../Pagamento/Pagamento';
import { useLocation } from "react-router-dom";

function TelaPagamento() {
  const [email, setEmail] = useState(sessionStorage.getItem("userEmail"));
  const [phone, setPhone] = useState("");
  const [enderecos, setEnderecos] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [address, setAddress] = useState("")
  const idUsuario = sessionStorage.getItem("userId");
  const [frete, setFrete] = useState(10.50);
  const [usuario, setUsuario] = useState([]);
  const [ddd, setDdd] = useState("");
  const [resto, setResto] = useState("");

  const location = useLocation();
  const { items, subTotal } = location.state || { items: [], subTotal: 0.0 };
  
  const fetchEnderecos = async () => {
    try {
      const response = await api.get(`/enderecos/usuario/${idUsuario}`);
      setEnderecos(response.data.map(endereco => endereco.apelido));
    } catch (error) {
      console.error('Erro ao buscar endereço:', error.response?.data);
    }
  };

  useEffect(() => {
   fetchEnderecos();
  }, []);

  const fetchUsuario = async () => {
    try {
      const response = await api.get(`/usuarios/${idUsuario}`);
      setUsuario(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error.response?.data);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  function formatarTelefone(numero) {
    const apenasNumeros = numero.replace(/\D/g, "");
    if (apenasNumeros.length === 11) {
      return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (apenasNumeros.length === 10) {
      return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return numero;
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico

    setPhone(value);

    if (value.length > 2) {
      setDdd(value.slice(0, 2)); // Pega os 2 primeiros dígitos como DDD
      setResto(value.slice(2));  // Pega o restante do número
    } else {
      setDdd(value);  // Se tiver menos de 3 dígitos, o DDD é igual ao valor
      setResto("");    // O restante fica vazio
    }
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
                  value={formatarTelefone(phone)}
                  onChange={handlePhoneChange}
                />
              </label>
            </form>
          </div>

          <div className="delivery-address">
            <h2>Escolher Endereço de Entrega</h2>
            <select value={address} onChange={(e) => setAddress(e.target.value)}>
              {enderecos.map((apelido, index) => (
                <option key={index} value={apelido}>
                  {apelido}
                </option>
              ))}
            </select>
          </div>

        </div>

         <div className="order-summary">
      <h2>Resumo do Pedido</h2>
      {items?.map((item, index) => (
        <div className="item" key={index}>
          <img src={item?.imagens[0]} alt={item?.nome} />
          <p>
            {item?.nome} ({item?.tamanho}) - R${item?.preco.toFixed(2)}
          </p>
        </div>
      ))}
      <div className="summary">
        <p>Subtotal: R$ {parseFloat(subTotal).toFixed(2)} </p>
        <p>Frete: R$ {parseFloat(frete).toFixed(2)} </p>
        <h3>Total: R$ {(parseFloat(subTotal) + parseFloat(frete)).toFixed(2)} </h3>
        <Pagamento items={items} usuario={usuario} frete={frete} endereco={endereco} ddd={ddd} telefone={resto}/>
      </div>

        </div>
      </main>
    </div>
  );
}

export default TelaPagamento;
