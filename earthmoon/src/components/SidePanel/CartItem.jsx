import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="bag-item">
      <div className="item-image" style={{ backgroundColor: item.color }} />
      <div className="item-details">
        <p className="item-name">{item.name}</p>
        <p className="item-price">R$ {item.price}</p>
        <button className="remove-button" onClick={onRemove}>Excluir</button>
      </div>
    </div>
  );
};

export default CartItem;