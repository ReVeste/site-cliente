import React, { useState, useEffect } from 'react';
import './SidePanelBag.css';
import CartItem from './CartItem';
import api from '../../Api';

const SidePanelBag = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await api.get('/pedidos/2/produtos');
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchItems();
    }
  }, [isOpen]);

  const removeItem = async (idPedido, idProduto) => {
    try {
      idPedido = 2;
      await api.delete(`pedidos/${idPedido}/produto/${idProduto}`); 
      setItems(prevItems => prevItems.filter(item => item.id !== idProduto));
    } catch (error) {
      console.error('Erro ao remover o item:', error);
    }
  };

  const removerTodosItens = async (idPedido) => {
    try {
      await api.delete(`pedidos/1`); 
      setItems([]);
    } catch (error) {
      console.error('Erro ao remover o item:', error);
    }
  }

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
      console.error('Erro ao realizar checkout:', error);
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
              onRemove={() => removeItem(null, item.id)}
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
      </div>
    </div>
  );
};

export default SidePanelBag;
