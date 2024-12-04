import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TelaPagamentoComponent from '../../components/TelaPagamento/TelaPagamento';
import Footer from '../../components/Footer/Footer';

const TelaPagamento = () => {
  return (
    <div>
      <Navbar />
      <TelaPagamentoComponent />
      <Footer />
    </div>
  );
};

export default TelaPagamento;