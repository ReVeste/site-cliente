/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SidePanel.css';
import api from '../../Api';

const SidePanelLogin = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    api.post('/usuarios/login', {
      email: email,
      senha: senha
    })
    .then(response => {
      console.log('Login bem-sucedido:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/configuracao-cliente')
    })
    .catch(error => {
      console.error('Erro no login:', error.response.data);
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    });
  };

  return (
    <div className="side-panel">
      <button className="close-button" onClick={onClose}>✖</button>
      <h2 className="title">Fazer login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          name='email' 
          placeholder="E-mail" 
          className="input-field" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          name='senha' 
          placeholder="Senha" 
          className="input-field" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required
        />
        <div className="forgot-password-container">
          <Link to="/forgot-password" className="forgot-password" onClick={onClose}>
            Esqueceu a senha?
          </Link>
        </div>
        <button className="login-button" type="submit">Fazer login</button>
      </form>
      <div className="create-account">
        <span>Não tem uma conta? </span>
        <Link to="/cadastro" className="create-account-link" onClick={onClose}>
          Criar conta
        </Link>
      </div>
      <p className="terms">Ao cadastrar-se, você concorda com a Política de Privacidade e os Termos e Condições.</p>
    </div>
  );
};

export default SidePanelLogin;
