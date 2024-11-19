import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SidePanel.css';
import api from '../../Api';

const SidePanelLogin = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Novo estado para mensagem de sucesso
  const [popupVisible, setPopupVisible] = useState(false); // Estado para controlar a visibilidade do pop-up

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(senha)) {
      setErrorMessage('Por favor, insira credenciais válidas.');
      return;
    }

    try {
      const response = await api.post('/usuarios/login', {
        email,
        senha,
      });
      console.log('Login bem-sucedido:', response.data);
      
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userId', response.data.userId);
      sessionStorage.setItem('userName', response.data.nome);
      sessionStorage.setItem('userEmail', response.data.email);
      
      setSuccessMessage('Login efetuado! Aguarde...');
      setPopupVisible(true);

      setTimeout(() => {
        setPopupVisible(false);
        onClose();
        navigate('/configuracao-cliente');
      }, 2000);
      
    } catch (error) {
      console.error('Erro no login:', error.response?.data);
      if (error.response.status === 409) {
        setErrorMessage('Erro no cadastro. CPF ou E-mail já cadastrado!');
      } else {
        setErrorMessage('Erro no cadastro. Verifique os dados e tente novamente.');
      }

      setSuccessMessage(''); // Limpa a mensagem de sucesso anterior
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  if (!isOpen) return null;

  return (
    <div className="side-panel">
      <button className="close-button" onClick={onClose}>✖</button>
      <h2 className="title">Fazer login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && popupVisible && (
        <div className="popup-message">{successMessage}</div>
      )}
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