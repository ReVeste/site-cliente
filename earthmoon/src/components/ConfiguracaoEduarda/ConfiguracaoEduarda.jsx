import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './ConfiguracaoEduarda.css';
import { Bar, Line } from 'react-chartjs-2';
import exportIcon from '../../assets/export.jpg';
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
                fill: false,
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

    const renderDashboard = () => (
        <div className="dashboardContainer">
            <div className="dashboardHeader">
                <h2>DASHBOARD</h2>
                <div className="dashboardLucros">
                    <div className="totalBox">
                        <h4>Lucro total do mês</h4>
                        <h3>R$ 16.944,00</h3>
                    </div>
                    <div className="totalBox">
                        <h4>Lucro total do ano</h4>
                        <h3>R$ 16.944,00</h3>
                    </div>
                </div>
            </div>

            <div className="dashboardStats">
                <div className="statCard">
                    <p>Pedidos para enviar</p>
                    <h3>12</h3>
                    <img src={exportIcon} alt="Exportar" className="smallExportIcon" />
                </div>
                <div className="statCard">
                    <p>Produtos disponíveis</p>
                    <h3>5</h3>
                    <p>À venda</p>
                    <img src={exportIcon} alt="Exportar" className="smallExportIcon" />
                </div>
                <div className="statCard">
                    <p>Você lucrou</p>
                    <h3>2%</h3>
                    <p className="smallText">a mais que no mês anterior</p>
                    <img src={exportIcon} alt="Exportar" className="smallExportIcon" />
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
                        <option>Do ano</option>
                    </select>
                    <img src={exportIcon} alt="Exportar" className="smallExportIcon" />
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
                        <option>Do ano</option>
                    </select>
                    <img src={exportIcon} alt="Exportar" className="smallExportIcon" />
                </div>
            </div>

            <div className="dashboardMainContent">
                <div className="dashboardLeft">
                    <div className="dashboardCharts">
                        <div className="chartsWrapper">
                            <div className="chartContainer">
                                <h3>Lucros Mensais</h3>
                                <Line data={dataCadastrosUsuarios} />
                                <img src={exportIcon} alt="Exportar" className="exportIcon" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboardRight">
                    <div className="dashboardCharts">
                        <div className="chartsWrapper">
                            <div className="chartContainer">
                                <h3>Quantidades de vendas por mês</h3>
                                <Bar data={dataCadastrosPorRegiao} />
                                <img src={exportIcon} alt="Exportar" className="exportIcon" />
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
                        <img src={exportIcon} alt="Exportar" className="exportIcon" />
                    </div>
                    <div className="chartContainer">
                        <h3>Cadastros por região</h3>
                        <Bar data={dataCadastrosPorRegiao} />
                        <img src={exportIcon} alt="Exportar" className="exportIcon" />
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
                    {itemSelecionado === 'Dashboard' && renderDashboard()}
                </main>
            </div>
        </>
    );
};

export default ConfiguracaoEduarda;