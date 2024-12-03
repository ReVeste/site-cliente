import React, { useEffect, useState } from "react";
import "./TelaPagamento.css";
import api from "../../Api";
import Pagamento from "../Pagamento/Pagamento";

import { useLocation } from "react-router-dom";

function TelaPagamento() {
  const [currentStep, setCurrentStep] = useState("Entrega");
  const [email, setEmail] = useState(sessionStorage.getItem("userEmail"));
  const [phone, setPhone] = useState("");
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [frete, setFrete] = useState(10.5);
  const [usuario, setUsuario] = useState([]);
  const [ddd, setDdd] = useState("");
  const [resto, setResto] = useState("");
  const [erros, setErros] = useState({});


  const camposEndereco = {
    apelido: "", 
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  };

  const [novoEndereco, setNovoEndereco] = useState(camposEndereco);

  const location = useLocation();
  const { items, subTotal } = location.state || { items: [], subTotal: 0.0 };
  const idUsuario = sessionStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoEndereco({ ...novoEndereco, [name]: value });
  };

  const fetchEnderecos = async () => {
    try {
      const response = await api.get(`/enderecos/usuario/${idUsuario}`);
      setEnderecos(response.data.map((endereco) => endereco.apelido));
    } catch (error) {
      console.error("Erro ao buscar endereço:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchEnderecos();
    fetchUsuario()
  }, []);

  const fetchUsuario = async () => {
    try {
      const response = await api.get(`/usuarios/${idUsuario}`);
      setUsuario(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error.response?.data);
    }
  };

  const handleSalvarEndereco = async () => {
    const camposObrigatorios = Object.keys(camposEndereco).filter((campo) => campo !== "complemento");
    const novosErros = {};
  
    camposObrigatorios.forEach((campo) => {
      if (novoEndereco[campo].trim() === "") {
        novosErros[campo] = `O campo ${campo} é obrigatório.`;
      }
    });
  
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }
  
    setErros({});
  
    try {
      const idUsuario = sessionStorage.getItem("userId");
  
      const enderecoComUsuario = {
        apelido: novoEndereco.apelido,
        cep: novoEndereco.cep,
        rua: novoEndereco.rua,
        numero: novoEndereco.numero,
        complemento: novoEndereco.complemento,
        bairro: novoEndereco.bairro,
        cidade: novoEndereco.cidade,
        uf: novoEndereco.uf,
        idUsuario,
      };
  
      const response = await api.post("/enderecos", enderecoComUsuario);
      if (response.status === 201) {
        setEnderecos([...enderecos, response.data.map((endereco) => endereco.apelido)]);
        alert("Endereço salvo com sucesso!");
        setNovoEndereco(camposEndereco);
      } else {
        alert("Erro ao salvar endereço. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao salvar endereço: " + error.message);
    }
  };  
  
  

  return (
    <div className="containerPagamento">
      <main className="content">
        <div className="progress-bar">
          <span className="step completed">Carrinho</span>
          <span
            className={`step ${currentStep === "Entrega" ? "active" : "completed"}`}
            onClick={() => setCurrentStep("Entrega")}
          >
            Entrega
          </span>
          <span
            className={`step ${currentStep === "Pagamento" ? "active" : ""}`}
            onClick={() => setCurrentStep("Pagamento")}
          >
            Pagamento
          </span>
          <span className="step">Conclusão</span>
        </div>

        {currentStep === "Entrega" && (
          <>
            <div className="new-address-form">
              <h2>Criar Novo Endereço</h2>
              <form className="form-grid">
                {Object.keys(camposEndereco).map((campo) => (
                  <div className="form-field" key={campo}>
                    <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                    <input
                      type="text"
                      name={campo}
                      value={novoEndereco[campo]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <button type="button" onClick={handleSalvarEndereco}>
                  Salvar Endereço
                </button>
              </form>
            </div>
          </>
        )}

        {currentStep === "Pagamento" && (
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
              <h3>
                Total: R$ {(parseFloat(subTotal) + parseFloat(frete)).toFixed(2)}
              </h3>
              <Pagamento
                items={items}
                usuario={usuario}
                frete={frete}
                endereco={enderecoSelecionado}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TelaPagamento;
