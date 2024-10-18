import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import SidePanelLogin from '../SidePanel/SidePanel'; 
import SidePanelBag from '../SidePanel/SidePanelBag';
import userIcon from '../../assets/userIcon.png';
import cartIcon from '../../assets/sacolaIcon.png';
import logo from '../../assets/icon.png';

const Navbar = () => {
  const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false);
  const [isBagPanelOpen, setIsBagPanelOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { name: "Ropa Verde Neon", price: 13, color: "#8BC34A", onRemove: (index) => handleRemoveItem(index) },
  ]);

  const toggleLoginPanel = () => {
    setIsLoginPanelOpen(!isLoginPanelOpen);
  };

  const toggleBagPanel = () => {
    setIsBagPanelOpen(!isBagPanelOpen);
  };

  const handleRemoveItem = (index) => {
    const newItems = cartItems.filter((item, i) => i !== index);
    setCartItems(newItems);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLoginPanelOpen && !event.target.closest('.side-panel')) {
        setIsLoginPanelOpen(false);
      }
      if (isBagPanelOpen && !event.target.closest('.side-panel-bag')) {
        setIsBagPanelOpen(false);
      }
    };
    

    if (isLoginPanelOpen || isBagPanelOpen) {
      document.body.classList.add('no-scroll');
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoginPanelOpen, isBagPanelOpen]);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/accessories" className="nav-link">Acessórios</Link>
            <span className="dropdown-icon">▼</span>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">Roupas</Link>
          </li>
        </ul>
        <div className="nav-icons">
          <img
            src={userIcon}
            alt="user icon"
            className="icon"
            onClick={toggleLoginPanel}
          />
          <img
            src={cartIcon}
            alt="cart icon"
            className="icon"
            onClick={toggleBagPanel}
          />
        </div>
      </nav>

      {isLoginPanelOpen && <div className="backdrop" onClick={toggleLoginPanel} />}
      {isBagPanelOpen && <div className="backdrop" onClick={toggleBagPanel} />}

      <SidePanelLogin isOpen={isLoginPanelOpen} onClose={toggleLoginPanel} />
      <SidePanelBag isOpen={isBagPanelOpen} onClose={toggleBagPanel} items={cartItems} />
    </div>
  );
};

export default Navbar;