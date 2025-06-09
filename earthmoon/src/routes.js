// import React, { useEffect, useState } from "react";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import Cadastro from "./pages/Cadastro/Cadastro";
// import SidePanelLogin from "./components/SidePanel/SidePanel";
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto";
import DetalheProdutoPage from "./pages/DetalheProdutos/DetalheProdutos";
import ConfiguracaoCliente from "./pages/ConfiguracaoCliente/ConfiguracaoCliente";
import Sacola from "./components/Sacola/Sacola";
import ListaPage from "./pages/Lista/Lista";
import ConfiguracaoEduarda from "./pages/ConfiguracaoEduarda/ConfiguracaoEduarda";
import TelaPagamento from "./pages/TelaPagamento/TelaPagamento.jsx"; // Importação da nova tela

// const PrivateRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/cadastro" />;
// };

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/produto/:id" element={<DetalheProdutoPage />} />
      <Route path="/acessorios" element={<Products />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/sacola" element={<Sacola />} />
      <Route path="/lista" element={<ListaPage />} />
      <Route path="/pagamento" element={<TelaPagamento />} />
      <Route path="/configuracao-cliente"
        element={sessionStorage.getItem("isLoggedIn") ? <ConfiguracaoCliente /> : <Navigate to="/cadastro" />}
      />
      <Route path="/configuracao-eduarda"
        element={sessionStorage.getItem("isLoggedIn") ? <ConfiguracaoEduarda /> : <Navigate to="/cadastro" />}
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComponent;