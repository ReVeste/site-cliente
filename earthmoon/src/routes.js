import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products/Products';
import Home from './pages/Home/Home';
import Cadastro from './pages/Cadastro/Cadastro'; 
import SidePanelLogin from './components/SidePanel/SidePanel';
import CadastroProduto from './pages/CadastroProduto/CadastroProduto';
import DetalheProdutoPage from './pages/DetalheProdutos/DetalheProdutos';
import ConfiguracaoCliente from './pages/ConfiguracaoCliente/ConfiguracaoCliente'; // Ensure this is imported

const RoutesComponent = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<SidePanelLogin isOpen={true} onClose={() => {}} />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/produto/:id" element={<DetalheProdutoPage />} />
      <Route 
        path="/configuracao-cliente" 
        element={isLoggedIn ? <ConfiguracaoCliente /> : <Navigate to="/cadastro" />}
      />
      <Route path="/acessorios" element={<Products />} />
      <Route path="/produtos" element={<Products />} /> 
    </Routes>
  );
};

export default RoutesComponent;
