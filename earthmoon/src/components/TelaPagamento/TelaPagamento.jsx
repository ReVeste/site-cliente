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
  const [erros, setErros] = useState({});

  const camposEndereco = {
    cep: "",
    uf: "",
    cidade: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
  };

  const [novoEndereco, setNovoEndereco] = useState(camposEndereco);

  const location = useLocation();
  const { items, subTotal } = location.state || { items: [], subTotal: 0.0 };
  const idUsuario = sessionStorage.getItem("userId");

  const handleConclusao = () => {
    console.log("Clicou em Concluir");
    setCurrentStep("Conclusão");
    console.log("Estado atual de currentStep:", currentStep);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoEndereco({ ...novoEndereco, [name]: value });
  };

  const fetchEnderecos = async () => {
    try {
      const response = await api.get(`/enderecos/usuario/${idUsuario}`);
      console.log("Endereços carregados:", response.data);
      setEnderecos(response.data.map((endereco) => endereco.apelido));
    } catch (error) {
      console.error("Erro ao buscar endereço:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchEnderecos();
    fetchUsuario();
  }, []);

  const fetchUsuario = async () => {
    try {
      const response = await api.get(`/usuarios/${idUsuario}`);
      console.log("Usuário carregado:", response.data);
      setUsuario(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error.response?.data);
    }
  };

  const handleSalvarEndereco = async () => {
    console.log("Tentando salvar o endereço...");
    const camposObrigatorios = Object.keys(camposEndereco).filter((campo) => campo !== "complemento");
    const novosErros = {};

    camposObrigatorios.forEach((campo) => {
      if (novoEndereco[campo].trim() === "") {
        novosErros[campo] = `O campo ${campo} é obrigatório.`;
      }
    });

    if (Object.keys(novosErros).length > 0) {
      console.log("Erros encontrados nos campos:", novosErros);
      setErros(novosErros);
      return;
    }

    setErros({});
    console.log("Endereço válido. Enviando para o servidor...");

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
        console.log("Endereço salvo com sucesso:", response.data);
        setEnderecos([...enderecos, novoEndereco.apelido]);
        alert("Endereço salvo com sucesso!");
        setNovoEndereco(camposEndereco);
        setCurrentStep("Pagamento");
        console.log("Mudando para etapa Pagamento.");
      } else {
        alert("Erro ao salvar endereço. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao salvar endereço:", error.message);
      alert("Erro ao salvar endereço: " + error.message);
    }
  };

  const handleStepChange = (step) => {
    // Impede que o usuário volte para etapas anteriores quando estiver em Pagamento ou Conclusão
    if (
      (currentStep === "Pagamento" && step === "Entrega") ||
      (currentStep === "Conclusão" && (step === "Entrega" || step === "Pagamento"))
    ) {
      console.log("Navegação não permitida.");
      return;
    }
    setCurrentStep(step);
  };

  return (
    <div className="containerPagamento">
      <main className="content">
        <div className="progress-bar">
          <span className="step completed">Carrinho</span>
          <span
            className={`step ${
              currentStep === "Entrega" ? "active" : "completed"
            }`}
            onClick={() => handleStepChange("Entrega")}
          >
            Entrega
          </span>
          <span
            className={`step ${
              currentStep === "Pagamento"
                ? "active"
                : currentStep === "Conclusão"
                ? "completed"
                : ""
            }`}
            onClick={() => handleStepChange("Pagamento")}
          >
            Pagamento
          </span>
          <span
            className={`step ${currentStep === "Conclusão" ? "active" : ""}`}
          >
            Conclusão
          </span>
        </div>

        {currentStep === "Entrega" && (
          <div className="new-address-form">
            <h2>Endereço de entrega</h2>
            <form className="form-grid">
              {Object.keys(camposEndereco).map((campo) => (
                <div className="form-field" key={campo}>
                  <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                  <input
              type="text"
              name={campo}
              value={novoEndereco[campo]}
              onChange={handleChange}
              onBlur={() => {
                if (campo === "complemento") return;

                if (novoEndereco[campo].trim() === "") {
                  setErros((prevErros) => ({
                    ...prevErros,
                    [campo]: `O campo ${campo} é obrigatório.`,
                  }));
                } else {
                  setErros((prevErros) => {
                    const { [campo]: _, ...restoErros } = prevErros;
                    return restoErros;
                  });
                }
              }}
              className={erros[campo] ? "input-error" : ""}
            />
                  {erros[campo] && <span className="error-message">{erros[campo]}</span>}
                </div>
              ))}
              <button className="botaoo" onClick={handleSalvarEndereco}>
                Próximo
              </button>
            </form>
          </div>
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
              <button type="button" className="botaoo" onClick={handleSalvarEndereco}>
              Próximo
              </button>
            </div>
          </div>
        )}

        {currentStep === "Conclusão" && (
          <div className="container-conclusao">
            <h2>Pedido efetuado!</h2>
            <p>Entraremos em contato para enviar o código de rastreamento!</p>
            <p>Obrigada por confiar no Earth Moon!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default TelaPagamento;