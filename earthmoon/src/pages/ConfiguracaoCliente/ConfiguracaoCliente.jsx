import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ConfiguracaoCliente.module.css';
import home from '../../assets/Home.png';
import avaliacao from '../../assets/avaliacao.png';
import sair from '../../assets/Close.png';
import teste from '../../assets/teste.jpg';
import { useNavigate } from 'react-router-dom';
import api from '../../Api';

const ConfiguracaoCliente = () => {
    const navigate = useNavigate();
    const [itemSelecionado, setItemSelecionado] = useState('Geral');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [enderecos, setEnderecos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editandoEndereco, setEditandoEndereco] = useState(null);
    const [novoEndereco, setNovoEndereco] = useState({ apelido: '', CEP: '', cidade: '', estado: '', rua: '', bairro: '' });
    const [pedidos, setPedidos] = useState([]);
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const idUsuario = sessionStorage.getItem('userId');

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

    const itemClicado = (item) => {
        setItemSelecionado(item);
        if (item === 'Meus Endereços') fetchEnderecos();
        if (item === 'Minhas Compras') fetchCompras();
    };

    const fetchEnderecos = async () => {
        try {
            const response = await api.get(`/enderecos/usuario/${idUsuario}`);
            setEnderecos(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error.response?.data);
        }
    };

    const fetchCompras = async () => {
        try {
            const response = await api.get(`/pedidos/${idUsuario}/status?status=CONCLUIDO`);
            setPedidos(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error.response?.data);
        }
    };

    const renderGeral = () => (
        <div className={styles["detalhesGeral"]}>
            <h2>Informações da conta</h2>
            <div className={styles["contaInfo"]}>
                <p><strong>Nome</strong><br />{sessionStorage.getItem('userName')}</p>
                <p><strong>Endereço de e-mail</strong><br />{sessionStorage.getItem('userEmail')}</p>
            </div>
        </div>
    );

    const renderEnderecos = () => (
        <div className={styles["detalhesEndereco"]}>
            <h2>Meus Endereços</h2>
            {enderecos.length < 2 && !mostrarFormulario && (
                <button className={styles["adicionarEndereco"]} onClick={() => setMostrarFormulario(true)}>
                    Adicionar Novo Endereço
                </button>
            )}
            {/* ... restante do conteúdo de endereços */}
        </div>
    );

    const renderCompras = () => (
        <div className={styles["detalhesCompras"]}>
            <h2>Histórico</h2>
            {/* ... restante do conteúdo de compras */}
        </div>
    );

    const renderContent = () => {
        switch (itemSelecionado) {
            case 'Geral':
                return renderGeral();
            case 'Meus Endereços':
                return renderEnderecos();
            case 'Minhas Compras':
                return renderCompras();
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
                        {['Geral', 'Meus Endereços', 'Minhas Compras'].map((item) => (
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
