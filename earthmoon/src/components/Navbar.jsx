import React from 'react';
import '../styles/Navbar.css';

import userIcon from '../assets/userIcon.png'; 
import cartIcon from '../assets/sacolaIcon.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          Acessórios <span className="dropdown-icon">▼</span>
        </li>
        <li className="nav-item">Roupas</li>
      </ul>
      <div className="nav-icons">
        <img src={userIcon} alt="user icon" className="icon" />
        <img src={cartIcon} alt="cart icon" className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
