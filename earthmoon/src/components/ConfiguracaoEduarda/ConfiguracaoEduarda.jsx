import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './ConfiguracaoEduarda.css';
import { Bar, Line } from 'react-chartjs-2';
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

    const handleFiltroChange = (e, setFiltro) => {
        // Adiciona um pequeno atraso para preservar o hover
        setTimeout(() => setFiltro(e.target.value), 100);
    };

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

    const dataVendasMensais = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
            {
                label: 'Roupas',
                data: [15, 25, 30, 45, 50, 60],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Acessórios',
                data: [10, 20, 25, 35, 40, 50],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
                </div>
                <div className="statCard">
                    <p>Produtos disponíveis</p>
                    <h3>5</h3>
                    <p>À venda</p>
                </div>
                <div className="statCard">
                    <p>Você lucrou</p>
                    <h3>2%</h3>
                    <p className="smallText">a mais que no mês anterior</p>
                </div>
                <div className="statCard">
                    <p>Produtos enviados</p>
                    <h3>10</h3>
                    <select
                        className="noBorderSelect"
                        value={filtroProdutosEnviados}
                        onChange={(e) => handleFiltroChange(e, setFiltroProdutosEnviados)}
                    >
                        <option>Da semana</option>
                        <option>Do mês</option>
                        <option>Do ano</option>
                    </select>
                </div>
                <div className="statCard">
                    <p>Produtos cadastrados</p>
                    <h3>10</h3>
                    <select
                        className="noBorderSelect"
                        value={filtroProdutosCadastrados}
                        onChange={(e) => handleFiltroChange(e, setFiltroProdutosCadastrados)}
                    >
                        <option>Da semana</option>
                        <option>Do mês</option>
                        <option>Do ano</option>
                    </select>
                </div>
            </div>

            <div className="dashboardMainContent">
                <div className="dashboardLeft">
                    <div className="dashboardCharts">
                        <div className="chartsWrapper">
                            <div className="chartContainer">
                                <h3>Lucros Mensais</h3>
                                <Line
                                    data={{
                                        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
                                        datasets: [
                                            {
                                                label: 'Lucro Mensal',
                                                data: [120, 150, 180, 220, 290, 320],
                                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                                borderColor: 'rgba(75, 192, 192, 1)',
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboardRight">
                    <div className="dashboardCharts">
                        <div className="chartsWrapper">
                            <div className="chartContainer">
                                <h3>Quantidades de vendas por mês</h3>
                                <Bar
                                    data={dataVendasMensais}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            },
                                            title: {
                                                display: true,
                                                text: 'Vendas por Categoria de Produto',
                                            },
                                        },
                                    }}
                                />
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
                    {itemSelecionado === 'Dashboard' && renderDashboard()}
                </main>
            </div>
        </>
    );
};

export default ConfiguracaoEduarda;