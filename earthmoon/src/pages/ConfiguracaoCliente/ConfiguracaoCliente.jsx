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
    
    const togglePopup = () => {
        setIsPopupOpen(prev => !prev);
    };

    const handleRatingChange = (star) => {
        console.log(star);
        setRating(star);
    };

    const handleSubmitFeedback = async () => {
        if (!rating || feedbackText.trim() === '') {
            alert('Por favor, escolha uma nota e preencha o feedback.');
            return;
        }
    
        try {
            console.log({
                nota: rating,
                comentario: feedbackText,
                idUsuario: idUsuario
            }); 
            
            const response = await api.post('/feedbacks', {
                nota: rating,
                comentario: feedbackText,
                idUsuario: idUsuario
            });

            if (response.status === 201 || response.status === 200) {
                alert('Feedback enviado com sucesso!');
                togglePopup();
            } else {
                alert('Erro ao enviar feedback. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar feedback:', error.response?.data);
            alert('Ocorreu um erro ao enviar o feedback. Tente novamente.');
        }
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
                            <img
                                src={avaliacao}
                                alt="Avaliar"
                                className={styles["iconeAvaliacao"]}
                                onClick={togglePopup}
                            />
                        </div>

                        {isPopupOpen && (
                            <div className={styles["popupContainer"]}>
                                <div className={styles["popupContent"]}>
                                    <img
                                        src={sair}
                                        alt="Sair da Avaliação"
                                        className={styles["iconeSair"]}
                                        onClick={togglePopup}
                                    />
                                    <h2>Avalie sua compra!</h2>
                                    <p>É rápido e sua opinião é muito importante!</p>
                                    <img src={teste} alt="Produto Comprado Imagem" className={styles["imgTeste"]} />
                                    <p><strong>Pedido Vestido</strong><br />Data: 10/10/2024<br />Total: 100,00</p>

                                    {/* Star Rating Componente */}
                                    <div className={styles["starRating"]}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={star <= rating ? styles["starSelected"] : styles["star"]}
                                                onClick={() => handleRatingChange(star)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <textarea
                                        rows="1"
                                        placeholder="Avaliar:"
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                    ></textarea>

                                    <button className={styles["botaoEnviar"]} onClick={handleSubmitFeedback}>
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        )}
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