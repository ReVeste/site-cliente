import React, { useEffect, useState } from "react";
import "./TelaPagamento.css";
import api from "../../Api";
import Pagamento from "../Pagamento/Pagamento";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function TelaPagamento() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("Entrega");
  const [enderecos, setEnderecos] = useState([]);
  const [frete, setFrete] = useState(0.0);
  const [transPortadora, setTransPortadora] = useState("");
  const [usuario, setUsuario] = useState([]);
  const [erros, setErros] = useState({});

  const camposEndereco = {
    id: null,
    apelido: "", // Adicionado campo de apelido
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
  const { items, subTotal, idPedido } = location.state || {
    items: [],
    subTotal: 0.0,
  };
  const idUsuario = sessionStorage.getItem("userId");

  const handleConclusao = async () => {
    try {
      const response = await api.put(`/pedidos/${idPedido}`);
      console.log("Pedido recebido:", response.data);
    } catch (error) {
      console.error("Erro ao buscar o pedido:", error);
    }

    setCurrentStep("Conclusão");

    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setNovoEndereco((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "cep") {
      const cepSemMascara = value.replace(/\D/g, "");

      if (cepSemMascara.length === 8) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${cepSemMascara}/json/`
          );
          if (response.status === 200 && !response.data.erro) {
            const data = response.data;
            setNovoEndereco((prev) => ({
              ...prev,
              cep: cepSemMascara,
              rua: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              uf: data.uf || "",
            }));
          } else {
            alert("CEP não encontrado.");
          }
        } catch (error) {
          alert("Não foi possível buscar esse CEP.");
        }
      }
    }
  };

  const criarEntrega = async () => {
    if (novoEndereco.cep.trim() === "") {
      alert("Por favor, preencha o CEP.");
      return;
    }

    try {
      const response = await api.post(`/entregas?cep=${novoEndereco.cep}`);
      console.log("Resultado: " + response.status);
      console.log(response.data);
      const lista = response.data;

      let menorPreco = lista[0].price ?? Number.MAX_VALUE;
      let nome = "";
      for (let i = 0; i < lista.length; i++) {
        if (lista[i].price !== undefined && Number(lista[i].price) < Number(menorPreco)) {
          menorPreco = lista[i].price;
          nome = lista[i].name;
        }
      }
      setFrete(menorPreco);
      setTransPortadora(nome);
      handleSalvarEndereco();
    } catch (error) {
      console.log("Erro ao criar entrega. Verifique o CEP.");
      alert("Erro ao criar entrega. Verifique o CEP.");
    }
  };

  const fetchEnderecos = async () => {
    try {
      const response = await api.get(`/enderecos/usuario/${idUsuario}`);
      console.log("Endereços carregados:", response.data);
      setEnderecos(response.data); // Armazene os endereços do usuário
    } catch (error) {
      console.error("Erro ao buscar endereço:", error.response?.data);
    }
  };

  const handleSelecionarEndereco = (endereco) => {
  setNovoEndereco({ ...endereco });
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
  const camposObrigatorios = Object.keys(camposEndereco).filter(
    (campo) => campo !== "complemento" && campo !== "id"
  );

  const novosErros = {};
  camposObrigatorios.forEach((campo) => {
    if (String(novoEndereco[campo] || "").trim() === "") {
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

  // ✅ Verifica se está editando
  if (novoEndereco.id) {
    console.log("Endereço já existente, não será salvo novamente.");
    setCurrentStep("Pagamento");
    return;
  }

  try {
    const enderecoComUsuario = { ...novoEndereco, idUsuario };

    const response = await api.post("/enderecos", enderecoComUsuario);
    if (response.status === 201 || response.status === 200) {
      console.log("Endereço salvo com sucesso:", response.data);
      setEnderecos([...enderecos, response.data]);  // Ideal usar o retorno da API
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
    if (
      (currentStep === "Pagamento" && step === "Entrega") ||
      (currentStep === "Conclusão" &&
        (step === "Entrega" || step === "Pagamento"))
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
            {enderecos.length > 0 && (
              <div className="endereco-list">
                {enderecos.map((endereco, index) => (
                  <button 
                    key={index} 
                    className="endereco-item botaoEndereco" 
                    onClick={() => handleSelecionarEndereco(endereco)}
                  >
                    {endereco.apelido}
                  </button>
                ))}
              </div>
            )}
            <form className="form-grid">
  {Object.keys(camposEndereco)
    .filter((campo) => campo !== "id")
    .map((campo) => (
      <div className="form-field" key={campo}>
        <label>
          {campo.charAt(0).toUpperCase() + campo.slice(1)}:
        </label>
        <input
          type="text"
          name={campo}
          value={novoEndereco[campo] || ""}
          onChange={handleChange}
          onBlur={() => {
            if (campo === "complemento") return;

            if ((novoEndereco[campo] || "").trim() === "") {
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
        {erros[campo] && (
          <span className="error-message">{erros[campo]}</span>
        )}
      </div>
    ))}
  <button type="button" className="botaoo" onClick={criarEntrega}>
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
              <p>Transportadora:<b>{transPortadora} </b></p>
              <p>Frete: R$ {parseFloat(frete).toFixed(2)} </p>
              <h3>
                Total: R${" "}
                {(parseFloat(subTotal) + parseFloat(frete)).toFixed(2)}
              </h3>
              <Pagamento
                items={items}
                usuario={usuario}
                frete={frete}
                endereco={enderecos[0]}
              />
              <button
                type="button"
                className="botaoo"
                onClick={handleConclusao}
              >
                Próximo
              </button>
            </div>
          </div>
        )}

        {currentStep === "Conclusão" && (
          <div className="container-conclusao">
            <h2>Pedido efetuado!</h2>
            <p>
              Baixe o aplicativo dos Correios para ser notificado sobre o envio
              do pedido!
            </p>
            <p>Obrigada por confiar no Earth Moon!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default TelaPagamento;