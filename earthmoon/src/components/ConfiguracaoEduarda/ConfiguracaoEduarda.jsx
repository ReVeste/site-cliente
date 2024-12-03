import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './ConfiguracaoEduarda.css';
import ListaEduarda from '../ListaEduarda/ListaEduarda';
import { Bar, Line } from 'react-chartjs-2';
import minhaImagem from '../../assets/export.jpg';

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

  const renderDashboard = () => (
    <div className="dashboardContainer" role="region" aria-labelledby="dashboard-title">
      <div className="dashboardHeader">
        <h2 id="dashboard-title">DASHBOARD</h2>
        <div className="exportWrapper">
          <img
            className="export"
            src={minhaImagem}
            alt="Ícone para exportar pedidos"
            aria-label="Ícone para exportar pedidos em aberto"
          />
          <div className="exportText">Exportar pedidos em aberto</div>
        </div>
  
        <div className="dashboardLucros">
          <div className="totalBox" role="group" aria-label="Lucro total do mês e ano">
            <h4>Lucro total do mês</h4>
            <h3>R$ 16.944,00</h3>
          </div>
          <div className="totalBox">
            <h4>Lucro total do ano</h4>
            <h3>R$ 16.944,00</h3>
          </div>
        </div>
      </div>
  
      <div className="dashboardStats" role="list" aria-labelledby="dashboard-stats-title">
        <h3 id="dashboard-stats-title">Estatísticas principais</h3>
        <div className="statCard" role="listitem">
          <p>Pedidos para enviar</p>
          <h3>12</h3>
        </div>
        <div className="statCard" role="listitem">
          <p>Produtos disponíveis</p>
          <h3>5</h3>
          <p>À venda</p>
        </div>
        <div className="statCard" role="listitem">
          <p>Você lucrou</p>
          <h3>2%</h3>
          <p className="smallText">a mais que no mês anterior</p>
        </div>
        <div className="statCard" role="listitem">
          <p>Produtos enviados</p>
          <h3>10</h3>
          <select
            className="noBorderSelect"
            aria-label="Filtro para produtos enviados"
            value={filtroProdutosEnviados}
            onChange={(e) => setFiltroProdutosEnviados(e.target.value)}
          >
            <option>Da semana</option>
            <option>Do mês</option>
          </select>
        </div>
        <div className="statCard" role="listitem">
          <p>Produtos cadastrados</p>
          <h3>10</h3>
          <select
            className="noBorderSelect"
            aria-label="Filtro para produtos cadastrados"
            value={filtroProdutosCadastrados}
            onChange={(e) => setFiltroProdutosCadastrados(e.target.value)}
          >
            <option>Da semana</option>
            <option>Do mês</option>
          </select>
        </div>
      </div>
  
      <div className="dashboardMainContent">
        <div className="dashboardLeft" role="region" aria-labelledby="monthly-profits-title">
          <div className="dashboardCharts">
            <div className="chartsWrapper">
              <div className="chartContainer">
                <h3 id="monthly-profits-title">Lucros Mensais</h3>
                <Line data={Lucros} />
              </div>
            </div>
          </div>
        </div>
  
        <div className="dashboardRight" role="region" aria-labelledby="monthly-sales-title">
          <div className="dashboardCharts">
            <div className="chartsWrapper">
              <div className="chartContainer">
                <h3 id="monthly-sales-title">Quantidades de vendas por mês</h3>
                <Bar data={dataQtdVendas} />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="dashboardCharts">
        <div className="chartsWrapper">
          <div className="chartContainer" role="region" aria-labelledby="user-registrations-title">
            <h3 id="user-registrations-title">Cadastro de usuários</h3>
            <Line data={dataCadastrosUsuarios} />
          </div>
          <div className="chartContainer" role="region" aria-labelledby="regional-registrations-title">
            <h3 id="regional-registrations-title">Cadastros por região</h3>
            <Bar data={dataCadastrosPorRegiao} />
          </div>
        </div>
      </div>
    </div>
  );  

  return (
    <>
      <Navbar />
      <div className="configContainer" role="main">
        <aside className="sidebar" role="navigation" aria-label="Menu de configurações">
          <h1>Minhas Configurações</h1>
          <ul className="settingsMenu" role="menu">
            {['Geral', 'Dashboard'].map((item) => (
              <li
                key={item}
                className={itemSelecionado === item ? 'active' : ''}
                role="menuitem"
                aria-current={itemSelecionado === item ? 'page' : undefined}
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
        <main className="mainContent" role="region" aria-labelledby="main-content">
          <h2 id="main-content">Conteúdo principal</h2>
          {itemSelecionado === 'Geral' && renderGeral()}
          {itemSelecionado === 'Dashboard' && renderDashboard()}
        </main>
      </div>
    </>
  );
};

export default ConfiguracaoEduarda;