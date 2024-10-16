import React from 'react';
import { Link } from 'react-router-dom';
import './SidePanel.css';

const SidePanelLogin = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="side-panel">
      <button className="close-button" onClick={onClose}>✖</button>
      <h2 className="title">Fazer login</h2>
      <input type="email" placeholder="E-mail" className="input-field" />
      <input type="password" placeholder="Senha" className="input-field" />
      <div className="forgot-password-container">
        <Link to="/forgot-password" className="forgot-password" onClick={onClose}>
          Esqueceu a senha?
        </Link>
      </div>
      <button className="login-button">Fazer login</button>
      <div className="create-account">
        <span>Não tem uma conta? </span>
        <Link to="/register" className="create-account-link" onClick={onClose}>
          Criar conta
        </Link>
      </div>
      <p className="terms">Ao cadastrar-se, você concorda com a Política de Privacidade e os Termos e Condições.</p>
    </div>
  );
};

export default SidePanelLogin;