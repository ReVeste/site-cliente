import React, { useState } from 'react';
import SidePanelBag from '../SidePanel/SidePanelBag'; 
import DetalheProdutos from '../DetalheProdutos/DetalheProdutos';

const Sacola = () => {
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Exemplo de estado de login
  
    const handleAddToCart = (produto) => {
      console.log('Adicionando ao carrinho:', produto); // Verifique se esta função é chamada
      setCartItems((prevItems) => [...prevItems, produto]);
    };
  
    const toggleBag = () => {
      setIsBagOpen(!isBagOpen);
    };
  
    const handleLogin = () => {
      setIsLoggedIn(true);
    };
  
    return (
      <div>
        <button onClick={toggleBag}>Abrir Sacola</button>
        <SidePanelBag isOpen={isBagOpen} onClose={toggleBag} isLoggedIn={isLoggedIn} />
        <DetalheProdutos onAddToCart={handleAddToCart} /> {/* Verifique aqui */}
        <button onClick={handleLogin}>Login</button> {/* Para simular login */}
      </div>
    );
  };
  
  
  
  export default Sacola;  