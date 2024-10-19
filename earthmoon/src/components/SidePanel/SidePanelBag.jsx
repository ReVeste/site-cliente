import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SidePanelBag.css';
import CartItem from './CartItem';

const SidePanelBag = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const token = localStorage.getItem('token');
    try {
      console.log(localStorage.getItem('token'));
      const response = await axios.get('http://localhost:8080/pedidos/1/produtos', {
        headers: {  
          'Authorization': `Bearer ${token}`,
        }
      });
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchItems();
    }
  }, [isOpen]);

  const removeItem = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/pedidos/1/${id}`, {
        headers: {  
          'Authorization': `Bearer ${token}`,
        }
      }); 
  
      setItems(prevItems => prevItems.filter((_, i) => i !== id));
    } catch (error) {
      console.error('Erro ao remover o item:', error);
    }
  };

  const removerTodosItens = async (idPedido) => {
    const token = localStorage.getItem('token');
    
    try {
      await axios.delete(`http://localhost:8080/pedidos/1`, {
        headers: {  
          'Authorization': `Bearer ${token}`,
        }
      }); 
  
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
      const response = await axios.post('URL_DA_SUA_API/checkout', payload);
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
      </div>
    </div>
  );
};

export default SidePanelBag;
