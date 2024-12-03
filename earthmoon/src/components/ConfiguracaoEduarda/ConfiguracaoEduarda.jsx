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
  const [lucros, setLucros] = useState([]);
  const [qtdVendasRoupas, setQtdVendasRoupas] = useState([]);
  const [qtdVendasAcessorios, setQtdVendasAcessorios] = useState([]);
  const [cadastros, setCadastros] = useState([]);
  const [cadastrosRegiao, setCadastrosRegiao] = useState([]);
  const [mesesAnteriores, setMesesAnteriores] = useState([]);

  // Calcúlo dos meses para exibição
  const getLast6Months = () => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const currentMonth = new Date();
    const lastSixMonths = [];

    for (let i = 0; i < 6; i++) {
      const month = (currentMonth.getMonth() - i + 12) % 12;
      lastSixMonths.unshift(`${months[month]}`);
    }

    setMesesAnteriores(lastSixMonths);
  };

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

    const fetchLucros = async () => {
      try {
        const response = await api.get(`/pedidos/lucros-mensais`);
        const data = response.data;

        const lucroData = [
          data.lucroMesAnterior5,
          data.lucroMesAnterior4,
          data.lucroMesAnterior3,
          data.lucroMesAnterior2,
          data.lucroMesAnterior1,
          data.lucroMesAtual
        ];

        setLucros(lucroData);
        console.log('lucros mensais ' + lucroData);
      } catch (error) {
        console.error("Erro ao buscar lucros:", error.response?.data);
      }
    };

    const fetchQtdVendas = async () => {
      try {
        const response = await api.get(`/produtos/vendas-por-mes`);
        const data = response.data;

        const qtdVendasRoupas = [
          data.qtdVendasRoupasMesAnterior5,
          data.qtdVendasRoupasMesAnterior4,
          data.qtdVendasRoupasMesAnterior3,
          data.qtdVendasRoupasMesAnterior2,
          data.qtdVendasRoupasMesAnterior1,
          data.qtdVendasRoupasMesAtual
        ];

        const qtdVendasAcessorios = [
          data.qtdVendasAcessoriosMesAnterior5,
          data.qtdVendasAcessoriosMesAnterior4,
          data.qtdVendasAcessoriosMesAnterior3,
          data.qtdVendasAcessoriosMesAnterior2,
          data.qtdVendasAcessoriosMesAnterior1,
          data.qtdVendasAcessoriosMesAtual
        ];

        setQtdVendasRoupas(qtdVendasRoupas);
        setQtdVendasAcessorios(qtdVendasAcessorios);
        console.log('Quantidade vendas roupas ' + qtdVendasRoupas);
        console.log('Quantidade vendas acessórios ' + qtdVendasAcessorios);
      } catch (error) {
        console.error("Erro ao buscar quantidade de vendas", error.response?.data)
      }

    };

    const fetchCadastrosUsuarios = async () => {
      try {
        const response = await api.get(`/usuarios/cadastros-usuarios`);
        const data = response.data;

        const qtdCadastrosUsuarios = [
          data.cadastrosMesAnterior5,
          data.cadastrosMesAnterior4,
          data.cadastrosMesAnterior3,
          data.cadastrosMesAnterior2,
          data.cadastrosMesAnterior1,
          data.cadastrosMesAtual
        ];

        setCadastros(qtdCadastrosUsuarios);
        console.log('Quantidade cadastros ' + qtdCadastrosUsuarios);
      } catch (error) {
        console.error("Erro ao buscar cadastros", error.response?.data)
      }
    };

    const fetchCadastrosRegiao = async () => {
      try {
        const response = await api.get(`/enderecos/cadastros-por-regiao`);
        const data = response.data;

        const qtdCadastrosRegiao = [
          data.cadastrosSudeste,
          data.cadastrosNorte,
          data.cadastrosNordeste,
          data.cadastrosSul,
          data.cadastrosCentroOeste
        ];

        setCadastrosRegiao(qtdCadastrosRegiao);
        console.log('Quantidade cadastros por região ' + qtdCadastrosRegiao);
      } catch (error) {
        console.error("Erro ao buscar cadastros por região", error.response?.data)
      }
    };

    const fetchData = async () => {
      console.log("Dados atualizado!!");
      await Promise.all([
        getLast6Months(),
        fetchKpis(),
        fetchLucros(),
        fetchQtdVendas(),
        fetchCadastrosUsuarios(),
        fetchCadastrosRegiao()
      ]);
    };


    fetchData();
    // Fórmula para tempo de atualização dos dados
    const interval = setInterval(fetchData, 1 * 60 * 1000);
    return () => clearInterval(interval);

  }, []);

  const dataCadastrosUsuarios = {
    labels: mesesAnteriores,
    datasets: [
      {
        label: 'Cadastros de Usuários',
        data: cadastros,
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

  const LucrosDash = {
    labels: mesesAnteriores,
    datasets: [
      {
        label: 'Lucro Mensal',
        data: lucros,
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
        data: cadastrosRegiao,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataQtdVendas = {
    labels: mesesAnteriores,
    datasets: [
      {
        label: 'Roupas',
        data: qtdVendasRoupas,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Acessórios',
        data: qtdVendasAcessorios,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
    <div className="dashboardContainer" role="region" aria-labelledby="dashboard-title">
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
          <div className="totalBox" role="group" aria-label="Lucro total do mês e ano">
            <h4>Lucro total do mês</h4>
            <h3>R$ {kpis?.lucroTotalMes}</h3>
          </div>
          <div className="totalBox">
            <h4>Lucro total do ano</h4>
            <h3>R$ {kpis?.lucroTotalAno}</h3>
          </div>
        </div>
      </div>
  
      <div className="dashboardStats" role="list" aria-labelledby="dashboard-stats-title">
        <h3 id="dashboard-stats-title">Estatísticas principais</h3>
        <div className="statCard" role="listitem">
          <p>Pedidos para enviar</p>
          <h3>{kpis?.pedidosPagos}</h3>
        </div>
        <div className="statCard" role="listitem">
          <p>Produtos disponíveis</p>
          <h3>{kpis?.produtosDisponiveis}</h3>
          <p>À venda</p>
        </div>
        <div className="statCard" role="listitem">
          <p>Você lucrou</p>
          <h3>{kpis?.porcetagemLucro}%</h3>
          <p className="smallText">a mais que no mês anterior</p>
        </div>
        <div className="statCard" role="listitem">
          <p>Produtos enviados</p>
          <h3>
            {
              filtroProdutosEnviados === 'Da semana'
                ? kpis?.produtosEnviadosSemana
                : kpis?.produtosEnviadosMes
            }
          </h3>
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
          <h3>
            {
              filtroProdutosCadastrados === 'Da semana'
                ? kpis?.produtosCadastradosSemana
                : kpis?.produtosCadastradosMes
            }
          </h3>
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
      <div className="dashboardMainContent">
        <div className="dashboardLeft">
          <div className="dashboardCharts">
            <div className="chartsWrapper">
              <div className="chartContainer">
                <h3>Cadastro de usuários</h3>
                <Line data={dataCadastrosUsuarios} />
              </div>
            </div>
          </div>
        </div>
        <div className="dashboardRight">
          <div className="dashboardCharts">
            <div className="chartsWrapper">
              <div className="chartContainer">
                <h3>Cadastros por região</h3>
                <Bar data={dataCadastrosPorRegiao} />
              </div>
            </div>
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
