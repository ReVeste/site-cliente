import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './ConfiguracaoEduarda.css';
import ListaEduarda from '../ListaEduarda/ListaEduarda';
import { Bar, Line } from 'react-chartjs-2';
import minhaImagem from '../../assets/export.jpg';
import api from '../../Api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ConfiguracaoEduarda = () => {
  const [itemSelecionado, setItemSelecionado] = useState('Dashboard');
  const [filtroProdutosEnviados, setFiltroProdutosEnviados] = useState('Da semana');
  const [filtroProdutosCadastrados, setFiltroProdutosCadastrados] = useState('Da semana');
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
  const fetchKpis = async () => {
    try {
      const response = await api.get(`/pedidos/kpis`);
      setKpis(response.data);
      console.log(kpis);
    } catch (error) {
      console.error("Erro ao buscar kpis:", error.response?.data);
    }
  };
  fetchKpis();
}, []);

  const dataCadastrosUsuarios = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Cadastros de Usuários',
        data: [15, 20, 25, 30, 35, 28],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const renderGeral = () => (
    <div className="geralContainer">
      <ListaEduarda />
    </div>
  );

  const Lucros = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Lucro Mensal',
        data: [0, 50, 100, 150, 200, 250],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataCadastrosPorRegiao = {
    labels: ['Sudeste', 'Norte', 'Nordeste', 'Sul', 'Centro-Oeste'],
    datasets: [
      {
        label: 'Cadastros por Região',
        data: [35, 15, 25, 18, 22],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataQtdVendas = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Quantidade de Vendas',
        data: [15, 20, 25, 30, 35, 28],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleExport = async () => {
    try {
      const response = await api.get('pedidos/exportar', {
        responseType: 'blob',
      });
  
      const blob = new Blob([response.data], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'pedidos_em_aberto.csv';
      document.body.appendChild(link);
      link.click();
  
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
  
      console.log('Exportação bem-sucedida');
    } catch (error) {
      console.error('Erro ao exportar:', error.response?.data || error.message);
    }
  };  

  const renderDashboard = () => (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <h2>DASHBOARD</h2>
        <div
          className="exportWrapper" 
          onClick={handleExport} 
          style={{ cursor: 'pointer' }}
        >
          <img className="export" src={minhaImagem} alt="Export Icon" />
          <div className="exportText">Exportar pedidos em aberto</div>
        </div>

        <div className="dashboardLucros">
          <div className="totalBox">
            <h4>Lucro total do mês</h4>
            <h3>R$ {kpis?.lucroTotalMes}</h3>
          </div>
          <div className="totalBox">
            <h4>Lucro total do ano</h4>
            <h3>R$ {kpis?.lucroTotalAno}</h3>
          </div>
        </div>
      </div>

      <div className="dashboardStats">
        <div className="statCard">
          <p>Pedidos para enviar</p>
          <h3>{kpis?.pedidosPagos}</h3>
        </div>
        <div className="statCard">
          <p>Produtos disponíveis</p>
          <h3>{kpis?.produtosDisponiveis}</h3>
          <p>À venda</p>
        </div>
        <div className="statCard">
          <p>Você lucrou</p>
          <h3>{kpis?.porcetagemLucro}%</h3>
          <p className="smallText">a mais que no mês anterior</p>
        </div>
        <div className="statCard">
          <p>Produtos enviados</p>
          <h3>10</h3>
          <select
            className="noBorderSelect"
            value={filtroProdutosEnviados}
            onChange={(e) => setFiltroProdutosEnviados(e.target.value)}
          >
            <option>Da semana</option>
            <option>Do mês</option>
          </select>
        </div>
        <div className="statCard">
          <p>Produtos cadastrados</p>
          <h3>10</h3>
          <select
            className="noBorderSelect"
            value={filtroProdutosCadastrados}
            onChange={(e) => setFiltroProdutosCadastrados(e.target.value)}
          >
            <option>Da semana</option>
            <option>Do mês</option>
          </select>
        </div>
      </div>

      <div className="dashboardMainContent">
        <div className="dashboardLeft">
          <div className="dashboardCharts">
            <div className="chartsWrapper">
              <div className="chartContainer">
                <h3>Lucros Mensais</h3>
                <Line data={Lucros} />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboardRight">
          <div className="dashboardCharts">
            <div className="chartsWrapper">
              <div className="chartContainer">
                <h3>Quantidades de vendas por mês</h3>
                <Bar data={dataQtdVendas} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboardCharts">
        <div className="chartsWrapper">
          <div className="chartContainer">
            <h3>Cadastro de usuários</h3>
            <Line data={dataCadastrosUsuarios} />
          </div>
          <div className="chartContainer">
            <h3>Cadastros por região</h3>
            <Bar data={dataCadastrosPorRegiao} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="configContainer">
        <aside className="sidebar">
          <h1>Minhas Configurações</h1>
          <ul className="settingsMenu">
            {['Geral', 'Dashboard'].map((item) => (
              <li
                key={item}
                className={itemSelecionado === item ? 'active' : ''}
                onClick={() => setItemSelecionado(item)}
              >
                {item}
              </li>
            ))}
          </ul>
          <a href="/" className="backLink">
            Sair da minha conta
          </a>
        </aside>
        <main className="mainContent">
        {itemSelecionado === 'Geral' && renderGeral()}
          {itemSelecionado === 'Dashboard' && renderDashboard()}
        </main>
      </div>
    </>
  );
};

export default ConfiguracaoEduarda;
