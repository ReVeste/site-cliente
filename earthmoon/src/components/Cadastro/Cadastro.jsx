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

  const [formattedData, setFormattedData] = useState({
    formattedCpf: '',
    formattedTelefone: '',
  });

  const [isLogin, setIsLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Novo estado para mensagens de sucesso
  const [passwordStrength, setPasswordStrength] = useState('');
  const [strengthColor, setStrengthColor] = useState('red');

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Formatação e manipulação de CPF
    if (name === 'cpf') {
      const digits = value.replace(/\D/g, ''); // Remove não dígitos
      const formattedCpf = formatCPF(value); // Formata CPF
      setFormattedData({ ...formattedData, formattedCpf });
      setFormData({ ...formData, cpf: digits }); // Armazena apenas os dígitos
    } 
    
    // Formatação e manipulação de Telefone
    else if (name === 'telefone') {
      const digits = value.replace(/\D/g, ''); // Remove não dígitos
      const formattedTelefone = formatTelefone(value); // Formata Telefone
      setFormattedData({ ...formattedData, formattedTelefone });
      setFormData({ ...formData, telefone: digits }); // Armazena apenas os dígitos
    } 
    
    // Manipulação de Senha
    else if (name === 'password') {
      setFormData({ ...formData, password: value });
      const strength = validatePasswordStrength(value); // Valida a força da senha
      setPasswordStrength(strength.text);
      setStrengthColor(strength.color);
    } 
    
    // Para outros campos do formulário
    else {
      setFormData({ ...formData, [name]: value });
    }
  
    // Limpa as mensagens de erro e sucesso
    setErrorMessage('');
    setSuccessMessage(''); 
  };
  
  const formatCPF = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{2})$/, '$1-$2');
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
    setSuccessMessage(''); // Limpa a mensagem de sucesso ao alternar formulários
    setFormData({ firstName: '', cpf: '', telefone: '', email: '', password: '' });
    setFormattedData({ formattedCpf: '', formattedTelefone: '' });
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
    console.log(`Validando CPF: ${cpf}, Apenas dígitos: ${digitsOnly}`); // Log para CPF validado
    return regex.test(cpf) || (digitsOnly.length >= 9 && digitsOnly.length <= 11);
  };

  const validateTelefone = (telefone) => {
    const digitsOnly = telefone.replace(/\D/g, '');
    console.log(`Validando Telefone: ${telefone}, Apenas dígitos: ${digitsOnly}`); // Log para Telefone validado
    const isValid = digitsOnly.length >= 10 && digitsOnly.length <= 11; // Verifica se o comprimento está correto
    console.log(`Resultado da validação do telefone: ${isValid}`); // Log para o resultado da validação
    return isValid;
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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isLoggedIn', 'true');
      setSuccessMessage('Login efetuado! Aguarde...');
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.nome);
      localStorage.setItem('userEmail', response.data.email);
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate('/configuracao-cliente');
      }, 2000);
    })
    .catch(error => {
      console.error('Erro no login:', error.response.data);
      setErrorMessage('Credenciais inválidas. Tente novamente.');
      setSuccessMessage(''); // Limpa qualquer mensagem de sucesso anterior
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
  
    // Envio do telefone formatado (mas será enviado sem formatação)
    api.post('/usuarios', {
      nome: formData.firstName,
      cpf: formData.cpf,
      telefone: formData.telefone, // Aqui o número está sem formatação
      email: formData.email,
      senha: formData.password
    })
    .then(response => {
      console.log('Cadastro bem-sucedido:', response.data);
      setSuccessMessage('Conta criada! Redirecionando para login...');
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate('/');
      }, 3000);
    })
    .catch(error => {
      console.error('Erro no cadastro:', error.response.data);
      setErrorMessage('Erro no cadastro. Verifique os dados e tente novamente.');
      setSuccessMessage(''); // Limpa qualquer mensagem de sucesso anterior
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
              {successMessage}
            </div>
          </>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {isLogin ? (
          <form className="login-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="submit-button">Login</button>
          </form>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <h3>Cadastro</h3>
            <input
              type="text"
              name="firstName"
              placeholder="Nome Completo *"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF *"
              value={formattedData.formattedCpf}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telefone"
              placeholder="Telefone *"
              value={formattedData.formattedTelefone}
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