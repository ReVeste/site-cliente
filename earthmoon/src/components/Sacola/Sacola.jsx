import React, { useState } from 'react';
import SidePanelBag from '../SidePanel/SidePanelBag'; 
import DetalheProdutos from '../DetalheProdutos/DetalheProdutos';
import SidePanelLogin from '../SidePanel/SidePanel';

const Sacola = () => {
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true'); 
    const [isLoginOpen, setIsLoginOpen] = useState(false);
  
    const handleAddToCart = (produto) => {
        if (!isLoggedIn) {
            setIsLoginOpen(true);
            return;
        }
        console.log('Adicionando ao carrinho:', produto); 
        setCartItems((prevItems) => [...prevItems, produto]);
    };
  
    const toggleBag = () => {
      setIsBagOpen(!isBagOpen);
    };

    const handleLogin = () => {
      setIsLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');
      setIsLoginOpen(false);
    };

    const handleCloseLogin = () => {
      setIsLoginOpen(false);
    };
  
    return (
      <div>
        <button onClick={toggleBag}>Abrir Sacola</button>
        <SidePanelBag isOpen={isBagOpen} onClose={toggleBag} isLoggedIn={isLoggedIn} />
        <DetalheProdutos onAddToCart={handleAddToCart} />
        <SidePanelLogin isOpen={isLoginOpen} onClose={handleCloseLogin} onLogin={handleLogin} />
      </div>
    );
  };
  
export default Sacola;