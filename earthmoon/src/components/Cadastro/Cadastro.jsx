import React, { useState } from 'react';
import './Cadastro.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    subscribe: false,
  });

  const [isLogin, setIsLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  const toggleForm = (formType) => {
    setIsLogin(formType === 'login');
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
          // cadastro!!
          <form className="register-form" onSubmit={handleSubmit}>
            <h3>Criar conta</h3>
            <input
              type="text"
              name="firstName"
              placeholder="Nome"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Sobrenome"
              value={formData.lastName}
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
            <label className="subscribe-label">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
              />
              Enviar-me e-mails com promoções e novos itens
            </label>
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
