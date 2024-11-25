import './SidePanelBag.css';
import CartItem from './CartItem';
import api from '../../Api';
import React, { useState, useEffect } from 'react';
import Pagamento from '../Pagamento/Pagamento';

const idUsuario = sessionStorage.getItem("userId");

const SidePanelBag = ({ isOpen, onClose, isLoggedIn }) => {
  const [items, setItems] = useState([]);
  const [idPedido, setIdPedido] = useState(0);

  const addItemToBag = (produto) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagens: produto.imagens,
        descricao: produto.descricao,
      },
    ]);
  };

  // Modifiquei aqui a função para buscar os itens
  const fetchItems = async () => {
    if (isLoggedIn) return; // Não busca itens se o usuário está logado
    try {
      const response = await api.get(`/pedidos/${idUsuario}/em-aberto`);
      console.log(response.data);
      setIdPedido(response.data[0].idPedido);
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens:', error.response?.data);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchItems();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Usuário logado, limpando a sacola");
      setItems([]);
    }
  }, [isLoggedIn]);

  const removeItem = async (idProduto) => {
    try {
      await api.delete(`pedidos/${idPedido}/produto/${idProduto}`);
      setItems(prevItems => prevItems.filter(item => item.id !== idProduto));
    } catch (error) {
      console.error('Erro ao remover o item:', error.response?.data);
    }
  };

  const removerTodosItens = async () => {
    try {
      await api.delete(`pedidos/${idPedido}`);
      setItems([]);
    } catch (error) {
      console.error('Erro ao remover o item:', error.response?.data);
    }
  };

  const handleCheckout = async () => {
    const payload = {
      items: items.map(item => ({
        name: item.nome,
        price: item.preco,
      })),
      subtotal: items.reduce((acc, item) => acc + item.preco, 0),
    };

    try {
      const response = await api.post('URL_DA_SUA_API/checkout', payload);
      console.log('Checkout successful:', response.data);
    } catch (error) {
      console.error('Erro ao realizar checkout:', error.response?.data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="side-panel-bag">
      <button className="close-button" onClick={onClose}>✖</button>
      <h2 className="title">Sacolinha</h2>
      <div className="bag-content">
        {items.length > 0 ? (
          items.map((item) => (
            <CartItem 
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
            />
          ))
        ) : (
          <p>Sua sacola está vazia.</p>
        )}
      </div>
      <div className="bag-footer">
        <div className="subtotal">
          <span>Subtotal</span>
          <span>R$ {items.reduce((acc, item) => acc + item.preco, 0).toFixed(2)}</span>
        </div>
        <button className="clear-button" onClick={removerTodosItens}>Excluir Tudo</button>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        <Pagamento/>
      </div>
    </div>
  );
};

export default SidePanelBag;