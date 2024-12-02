// pages/DetalheProdutos/DetalheProdutos.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DetalheProdutos from '../../components/DetalheProdutos/DetalheProdutos';
import Footer from '../../components/Footer/Footer';

const DetalheProdutoPage = () => {
  return (
    <div>
      <Navbar />
      <DetalheProdutos />
      <Footer />
    </div>
  );
};

export default DetalheProdutoPage;