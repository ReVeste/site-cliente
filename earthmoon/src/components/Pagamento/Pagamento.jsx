import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import api from '../../Api';

const Pagamento = ({ items }) => {
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

    const usuario = {
      usuarioNome: 'Matheus Rabello',
      usuarioEmail: 'matheusmagsun@gmail.com',
      usuarioCodigoTelefone: '11',
      usuarioNumeroTelefone: '992247954',
      usuarioCpf: '44867726877',
      usuarioCep: '08450030',
      usuarioRua: 'Doutor Almírio de Campos',
      usuarioNumeroCasa: '33',
    };

    const payload = {
      itens,
      ...usuario,
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