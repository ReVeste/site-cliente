import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import SidePanelLogin from '../SidePanel/SidePanel'; 
import SidePanelBag from '../SidePanel/SidePanelBag';
import userIcon from '../../assets/userIcon.png';
import cartIcon from '../../assets/sacolaIcon.png';
import logo from '../../assets/icon.png';
import api from '../../Api';

const Navbar = () => {
  const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false);
  const [isBagPanelOpen, setIsBagPanelOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

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

  const handleLogin = async (email, senha) => {
    try {
      const response = await api.post('/usuarios/login', {
        email: email,
        senha: senha,
      });
      console.log('Login bem-sucedido:', response.data);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // Atualiza o localStorage para o login
      setIsLoginPanelOpen(false);
      navigate('/configuracao-cliente'); // Redireciona para a página de configuração do cliente
    } catch (error) {
      console.error('Erro no login:', error.response.data);
      // Aqui você pode querer exibir uma mensagem de erro ou lidar com o erro de outra forma
    }
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
            <Link to="/acessorios" className="nav-link">Acessórios</Link>
          </li>
          <li className="nav-item">
            <Link to="/produtos" className="nav-link">Roupas</Link>
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
      <SidePanelLogin 
        isOpen={isLoginPanelOpen} 
        onClose={toggleLoginPanel} 
        onLogin={handleLogin} // Passa a função de login para o SidePanelLogin
      />
      <SidePanelBag 
        isOpen={isBagPanelOpen} 
        onClose={toggleBagPanel} 
        items={cartItems} 
        onRemoveItem={handleRemoveItem} 
      />
    </div>
  );
};

export default Navbar;