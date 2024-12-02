import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import api from '../../Api';

const Pagamento = ({ items, usuario, frete, endereco, ddd, telefone }) => {
  const [preferenciaId, setPreferenciaId] = useState(null);

  // Inicializar Mercado Pago
  useEffect(() => {
    initMercadoPago('APP_USR-1dfce30a-2ce2-4bc7-ab7e-940f3cb99123', { locale: 'pt-BR' });
  }, []);

  // Função para criar a preferência
  const handleCheckout = async () => {
    if (!items || items.length === 0) {
      console.error('A lista de itens está vazia.');
      return;
    }

    const itens = items.map((item) => ({
      produtoId: item.id,
      produtoNome: item.nome,
      produtoDescricao: item.descricao,
      produtoQuantidade: 1,
      produtoPreco: item.preco,
    }));

    if (frete && parseFloat(frete) > 0) {
      itens.push({
        produtoId: 'frete', // ID único para identificar o frete
        produtoNome: 'Frete',
        produtoDescricao: 'Custo de entrega',
        produtoQuantidade: 1,
        produtoPreco: parseFloat(frete), // Certifique-se de que o frete é um número válido
      });
    }
    
    const user = {
      usuarioNome: usuario.nome,
      usuarioEmail: usuario.email,
      usuarioCodigoTelefone: ddd,
      usuarioNumeroTelefone: telefone,
      usuarioCpf: usuario.cpf,
      usuarioCep: endereco.cep,
      usuarioRua: endereco.rua,
      usuarioNumeroCasa: endereco.numero,
    };

    const payload = {
      itens,
      ...user,
    };

    try {
      const response = await api.post('/pagamentos', payload);
      setPreferenciaId(response.data.id); // Armazena o ID da preferência
      console.log('Checkout successful:', response.data.id);
    } catch (error) {
      console.error('Erro ao realizar checkout:', error.response?.data || error.message);
    }
  };

  // Executar o checkout ao carregar o componente
  useEffect(() => {
    handleCheckout();
  }, [items]);

  return (
    <div>
      {preferenciaId ? (
        <Wallet
          initialization={{
            preferenceId: preferenciaId,
            redirectMode: 'blank',
          }}
          customization={{
            texts: { valueProp: 'smart_option' },
          }}
        />
      ) : (
        <p>Carregando pagamento...</p>
      )}
    </div>
  );
};

export default Pagamento;