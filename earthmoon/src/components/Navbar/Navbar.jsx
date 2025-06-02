import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import SidePanelLogin from '../SidePanel/SidePanel'; 
import SidePanelBag from '../SidePanel/SidePanelBag';
import userIcon from '../../assets/userIcon.png';
import cartIcon from '../../assets/sacolaIcon.png';
import searchIcon from '../../assets/lupaIcon.png';
import logo from '../../assets/icon.png';
import api from '../../Api';

const Navbar = () => {
  const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false);
  const [isBagPanelOpen, setIsBagPanelOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
  const [searchQuery, setSearchQuery] = useState('');
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
  
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('userId', response.data.userId);
      sessionStorage.setItem('userName', response.data.nome);
      sessionStorage.setItem('userEmail', response.data.email);
      setIsLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');
      setIsLoginPanelOpen(false);
  
      if (response.data.email.toLowerCase() === 'eduardaprocorro10@gmail.com') {
        navigate('/configuracao-eduarda');
      } else {
        navigate('/configuracao-cliente');
      }
    } catch (error) {
      console.error('Erro no login:', error.response?.data);
    }
  };

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      const email = sessionStorage.getItem('userEmail') || '';
      if (email.toLowerCase() === 'eduardaprocorro10@gmail.com') {
        navigate('/configuracao-eduarda');
      } else {
        navigate('/configuracao-cliente');
      }
    } else {
      setIsLoginPanelOpen(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
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
      <nav className="navbar" role="navigation" aria-label="Barra de navegação">
        <div className="nav-left">
          <Link to="/" aria-label="Ir para a página inicial">
            <img src={logo} alt="Logo da loja" className="logo" />
          </Link>
        </div>

        <div className="nav-middle">
          <ul className="nav-links" aria-label="Links de navegação">
            <li className="nav-item">
              <Link to="/produtos" className="nav-link" aria-label="Ver roupas">
                Roupas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/acessorios" className="nav-link" aria-label="Ver acessórios">
                Acessórios
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-icons">
          {/* <form className="search-form" onSubmit={handleSearchSubmit} role="search" aria-label="Buscar produtos">
            <div className="search-input-wrapper">
              <img src={searchIcon} alt="Ícone de pesquisa" className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Digite o nome do produto para pesquisar"
              />
            </div>
          </form> */}

          <img
            src={userIcon}
            alt={isLoggedIn ? "Configurações do usuário" : "Ícone de login do usuário"}
            className="icon"
            onClick={handleUserIconClick}
            role="button"
            aria-label={isLoggedIn ? "Ir para as configurações do usuário" : "Fazer login"}
          />
          <img
            src={cartIcon}
            alt="Ícone do carrinho"
            className="icon"
            onClick={toggleBagPanel}
            role="button"
            aria-label="Abrir carrinho de compras"
          />
        </div>
      </nav>

      {isLoginPanelOpen && <div className="backdrop" onClick={toggleLoginPanel} role="button" aria-label="Fechar painel de login" />}
      {isBagPanelOpen && <div className="backdrop" onClick={toggleBagPanel} role="button" aria-label="Fechar painel do carrinho" />}
      
      <SidePanelLogin 
        isOpen={isLoginPanelOpen} 
        onClose={toggleLoginPanel} 
        onLogin={handleLogin}
        aria-labelledby="painel-login"
      />
      <SidePanelBag 
        isOpen={isBagPanelOpen} 
        onClose={toggleBagPanel} 
        items={cartItems} 
        onRemoveItem={handleRemoveItem} 
        aria-labelledby="painel-carrinho"
      />
    </div>
  );
};

export default Navbar;