import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="bag-item">
  <div className="item-image" style={{ backgroundColor: item.color }}>
    <img src={item.urlImagem} className="image" />
  </div>
  <div className="item-details">
    <p className="item-name">{item.nome}</p>
    <p className="item-price">R$ {item.preco.toFixed(2)}</p>
    <button className="remove-button" onClick={onRemove}>Excluir</button>
  </div>
</div>
  );
};

export default CartItem;