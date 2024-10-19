import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accessories from './pages/Accessories/Accessories';
import Products from './pages/Products/Products';
import Home from './pages/Home/Home';
import ConfiguracaoCliente from './pages/ConfiguracaoCliente/ConfiguracaoCliente';
import Cadastro from './pages/Cadastro/Cadastro'; 
import SidePanelLogin from './components/SidePanel/SidePanel';


const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configuracao-cliente" element={<ConfiguracaoCliente />} />
        <Route path="/acessorios" element={<Accessories />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/login" element={<SidePanelLogin isOpen={true} onClose={() => {}} />} /> 
      </Routes>
    </Router>
  );
};

export default RoutesComponent;