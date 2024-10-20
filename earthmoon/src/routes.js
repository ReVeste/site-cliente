import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accessories from './pages/Accessories/Accessories';
import Products from './pages/Products/Products';
import Home from './pages/Home/Home';
import Cadastro from './pages/Cadastro/Cadastro'; 
import SidePanelLogin from './components/SidePanel/SidePanel';
import CadastroProduto from './pages/CadastroProduto/CadastroProduto';  // Importando a nova página de cadastro de produto
import ProductView from './pages/VerProduto/VerProduto';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acessorios" element={<Accessories />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/login" element={<SidePanelLogin isOpen={true} onClose={() => {}} />} /> 
        <Route path="/cadastro-produto" element={<CadastroProduto />} />  {/* Nova rota */}
        <Route path="/produto-view" element={<ProductView />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
