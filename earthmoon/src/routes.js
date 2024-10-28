// routes/RoutesComponent.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './pages/Products/Products';
import Home from './pages/Home/Home';
import ConfiguracaoCliente from './pages/ConfiguracaoCliente/ConfiguracaoCliente';
import Cadastro from './pages/Cadastro/Cadastro'; 
import SidePanelLogin from './components/SidePanel/SidePanel';
import CadastroProduto from './pages/CadastroProduto/CadastroProduto';
import DetalheProdutoPage from './pages/DetalheProdutos/DetalheProdutos';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configuracao-cliente" element={<ConfiguracaoCliente />} />
        <Route path="/acessorios" element={<Products />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<SidePanelLogin isOpen={true} onClose={() => {}} />} /> 
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
        <Route path="/detalhe-produto" element={<DetalheProdutoPage />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;