import React, { useEffect, useState, useCallback } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import api from '../../Api';

const Pagamento = ({ items }) => {
  const [preferenciaId, setPreferenciaId] = useState(null);

  // Função para criar a preferência, agora memorizada com useCallback
  const handleCheckout = useCallback(async () => {
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
  }, [items]); // Dependências de useCallback

  // Inicializar Mercado Pago
  useEffect(() => {
    initMercadoPago('APP_USR-1dfce30a-2ce2-4bc7-ab7e-940f3cb99123', { locale: 'pt-BR' });
  }, []);

  // Executar o checkout ao carregar o componente
  useEffect(() => {
    handleCheckout();
  }, [handleCheckout]);

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
