import React, { useState } from 'react';
import './Cadastro.css';
import api from '../../Api';
// import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    cpf: '',
    telefone: '',
    email: '',
    password: '',
    subscribe: false,
  });

  const [isLogin, setIsLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleForm = (formType) => {
    setIsLogin(formType === 'login');
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    api.post('/usuarios/login', {
      email: formData.email,
      senha: formData.password,
    })
    .then(response => {
      console.log('Login bem-sucedido:', response.data);
      localStorage.setItem('token', response.data.token);
      // navigate('/configuracao-cliente');
    })
    .catch(error => {
      console.error('Erro no login:', error.response.data);
    });
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
  
    api.post('/usuarios', {
      nome: formData.firstName,
      cpf: formData.cpf,
      telefone: formData.telefone,
      email: formData.email,
      senha: formData.password
    })
    .then(response => {
      console.log('Cadastro bem-sucedido:', response.data);
      toggleForm('login');
    })
    .catch(error => {
      console.error('Erro no cadastro:', error.response.data);
    });
  };
  
  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };
  
  return (
    <div className="register-container">
      <div className="form-wrapper">
        <div className="form-toggle">
          <h2
            className={`toggle-option ${isLogin ? 'active' : ''}`}
            onClick={() => toggleForm('login')}
          >
            Fazer login
          </h2>
          <h2
            className={`toggle-option ${!isLogin ? 'active' : ''}`}
            onClick={() => toggleForm('cadastro')}
          >
            Cadastro
          </h2>
          <div className={`underline ${isLogin ? 'login' : 'cadastro'}`}></div>
        </div>
  
        {isLogin ? (
          <form className="register-form" onSubmit={handleSubmit}>
            <h3>Fazer login</h3>
            <input
              type="email"
              name="email"
              placeholder="E-mail *"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Senha *"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                &#128065;
              </span>
            </div>
            <p className="forgot-password">Esqueceu a senha?</p>
            <button type="submit" className="submit-button">Entrar</button>
          </form>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <h3>Criar conta</h3>
            <input
              type="text"
              name="firstName"
              placeholder="Nome *"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF *"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telefone"
              placeholder="Telefone *"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail *"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Senha *"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p>Mínimo 5 caracteres contendo letras e números</p>
            {/* <label className="subscribe-label">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
              />
              Enviar-me e-mails com promoções e novos itens
            </label> */}
            <button type="submit" className="submit-button">Criar</button>
            <p className="terms">
              Ao cadastrar-se, você concorda com a Política de Privacidade e os Termos e Condições.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
