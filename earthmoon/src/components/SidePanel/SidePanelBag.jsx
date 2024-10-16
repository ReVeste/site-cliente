import React, { useState } from 'react';
import './SidePanelBag.css';
import CartItem from './CartItem';

const SidePanelBag = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([
    { name: 'Item 1', price: 29.99, color: '#ff0000', onRemove: (index) => removeItem(index) },
    { name: 'Item 2', price: 49.99, color: '#00ff00', onRemove: (index) => removeItem(index) },
    { name: 'Item 3', price: 19.99, color: '#0000ff', onRemove: (index) => removeItem(index) },
    { name: 'Item 4', price: 35.50, color: '#f4a261', onRemove: (index) => removeItem(index) },
    { name: 'Item 5', price: 22.90, color: '#2a9d8f', onRemove: (index) => removeItem(index) },
    { name: 'Item 6', price: 75.00, color: '#264653', onRemove: (index) => removeItem(index) },
    { name: 'Item 7', price: 10.00, color: '#e76f51', onRemove: (index) => removeItem(index) },
  ]);

  const removeItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="side-panel-bag">
      <button className="close-button" onClick={onClose}>✖</button>
      <h2 className="title">Sacolinha</h2>
      <div className="bag-content">
        {items.length > 0 ? (
          items.map((item, index) => (
            <CartItem 
              key={index} 
              item={item} 
              onRemove={() => removeItem(index)}
            />
          ))
        ) : (
          <p>Sua sacola está vazia.</p>
        )}
      </div>
      <div className="bag-footer">
        <div className="subtotal">
          <span>Subtotal</span>
          <span>R$ {items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
        </div>
        <button className="clear-button" onClick={onClose}>Excluir Tudo</button>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default SidePanelBag;