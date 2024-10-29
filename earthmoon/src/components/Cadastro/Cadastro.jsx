import React, { useState } from 'react';
import './Cadastro.css';
import api from '../../Api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    cpf: '',
    telefone: '',
    email: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [strengthColor, setStrengthColor] = useState('red');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      const formattedCpf = formatCPF(value);
      setFormData({ ...formData, cpf: formattedCpf });
    } else if (name === 'telefone') {
      const formattedTelefone = formatTelefone(value);
      setFormData({ ...formData, telefone: formattedTelefone });
    } else if (name === 'password') {
      setFormData({ ...formData, password: value });
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength.text);
      setStrengthColor(strength.color);
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrorMessage('');
  };

  const formatCPF = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    const cpfPattern = digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{2})$/, '$1-$2');
    return cpfPattern.replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatTelefone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');
  };

  const toggleForm = (formType) => {
    setIsLogin(formType === 'login');
    setErrorMessage(''); 
  };


  const validateName = (name) => {
    const names = name.trim().split(' ');
    return names.length >= 2;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const validatePasswordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 5) {
        return { text: 'Fraca', color: 'red' };
    } else if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar && password.length >= 8) {
        return { text: 'Forte', color: 'green' };
    } else if (hasUppercase && hasLowercase && (hasNumber || hasSpecialChar) && password.length >= 6) {
        return { text: 'Moderada', color: 'yellow' };
    } else {
        return { text: 'Fraca', color: 'red' };
    }
};

  const validateCPF = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; 
    const digitsOnly = cpf.replace(/\D/g, '');
    return regex.test(cpf) || (digitsOnly.length >= 9 && digitsOnly.length <= 11);
  };

  const validateTelefone = (telefone) => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(telefone);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email) || !validatePassword(formData.password)) {
      setErrorMessage('Por favor, insira credenciais válidas.');
      return;
    }

    api.post('/usuarios/login', {
      email: formData.email,
      senha: formData.password,
    })
    .then(response => {
      console.log('Login bem-sucedido:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', response.data.id);
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate('/configuracao-cliente');
      }, 2000);
    })
    .catch(error => {
      console.error('Erro no login:', error.response.data);
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let errorMsg = '';
    if (!validateName(formData.firstName)) {
      errorMsg += 'Por favor, insira o nome e sobrenome. ';
    }
    if (!validateEmail(formData.email)) {
      errorMsg += 'E-mail inválido. ';
    }
    if (!validatePassword(formData.password)) {
      errorMsg += 'A senha deve ter pelo menos 5 caracteres. ';
    }
    if (!validateCPF(formData.cpf)) {
      errorMsg += 'CPF inválido. ';
    }
    if (!validateTelefone(formData.telefone)) {
      errorMsg += 'Telefone inválido. ';
    }

    if (errorMsg) {
      setErrorMessage(errorMsg);
      return;
    }

    api.post('/usuarios', {
      nome: formData.firstName,
      cpf: formData.cpf,
      telefone: formData.telefone,
      email: formData.email,
      senha: formData.password
    })
    .then(response => {
      console.log('Cadastro bem-sucedido:', response.data);
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate('/'); 
      }, 3000);
    })
    .catch(error => {
      console.error('Erro no cadastro:', error.response.data);
      setErrorMessage('Erro no cadastro. Verifique os dados e tente novamente.');
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

        {popupVisible && (
          <>
            <div className="backdrop" />
            <div className="popup-message">
              {isLogin ? 'Login efetuado! Aguarde...' : 'Conta criada! Redirecionando...'}
            </div>
          </>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

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
              id="cpf"
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
            {formData.password && (
            <div className="password-strength-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '10px' }}>
              <p className="password-strength" style={{ color: 'black', fontSize: '12px', marginBottom: '5px' }}>
                Força da senha: {passwordStrength}
              </p>
              <div
                className="password-strength-meter"
                style={{
                  width: passwordStrength === 'Forte' ? '100%' : passwordStrength === 'Moderada' ? '70%' : '30%',
                  height: '5px',
                  backgroundColor: strengthColor,
                  transition: 'width 0.5s'
                }}
              />
            </div>
          )}
            <button type="submit" className="submit-button">Cadastrar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;