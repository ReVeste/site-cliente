import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ConfiguracaoCliente.module.css';
import home from '../../assets/Home.png';
import { useNavigate } from 'react-router-dom';
import api from '../../Api';

const ConfiguracaoCliente = () => {
    const navigate = useNavigate();
    const [itemSelecionado, setItemSelecionado] = useState('Geral');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [enderecos, setEnderecos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const idUsuario = sessionStorage.getItem('userId');

    const itemClicado = (item) => {
        setItemSelecionado(item);
        if (item === 'Minhas Compras') fetchCompras();
    };

    const fetchCompras = async () => {
        try {
            const response = await api.get(`/pedidos/${idUsuario}/status?status=CONCLUIDO`);
            setPedidos(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error.response?.data);
        }
    };
    
    const handleRatingChange = (star) => {
        console.log(star);
        setRating(star);
    };

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            navigate('/cadastro');
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };


    const renderContent = () => {
        switch (itemSelecionado) {
            case 'Geral':
                return (
                    <div className={styles["detalhesGeral"]}>
                        <h2>Informações da conta</h2>
                        <div className={styles["contaInfo"]}>
                            <p><strong>Nome</strong><br />{sessionStorage.getItem('userName')}</p>
                            <p><strong>Endereço de e-mail</strong><br />{sessionStorage.getItem('userEmail')}</p>
                        </div>
                    </div>
                );

            case 'Minhas Compras':
                return (
                    <div className={styles["detalhesCompras"]}>
                        <h2>Histórico</h2>
                        <div className={styles["comprasInfo"]}>
                            {pedidos.length > 0 ? (
                                pedidos.map((pedido, index) => (
                                    <p key={index}>
                                        <strong>Pedido {index + 1}</strong><br />
                                        Data: {new Date(pedido.dataHora).toLocaleDateString("pt-BR")}<br />
                                        Total: R$ {pedido.valorTotal.toFixed(2)}
                                    </p>
                                ))
                            ) : (
                                <p>Nenhum pedido encontrado.</p>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles["configContainer"]}>
                <div className={styles["opcaoConfig"]}>
                    <div className={styles["tituloPagina"]}>
                        <ul className={styles["breadcrumbs"]}>
                            <li><a href="/"><img src={home} alt="home" className={styles["home"]} /></a></li>
                            <li><a href="/">Conta</a></li>
                        </ul>
                        <h1>Minhas configurações</h1>
                    </div>
                    <ul className={styles["settingsMenu"]}>
                        {['Geral', 'Minhas Compras'].map((item) => (
                            <li
                                key={item}
                                className={itemSelecionado === item ? styles['active'] : ''}
                                onClick={() => itemClicado(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleLogout} className={styles["logoutBtn"]}>Sair da conta</button>
                </div>
                {renderContent()}
            </div>
        </>
    );
}

export default ConfiguracaoCliente;