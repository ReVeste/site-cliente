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
    const [pedidos, setPedidos] = useState([]);
    const [rating, setRating] = useState(0); // Estado para armazenar a nota de 0 a 5
    const idUsuario = localStorage.getItem('userId');

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
            console.error('Erro ao buscar itens:', error);
        }
    };

    const fetchCompras = async () => {
        try {
            const response = await api.get(`/pedidos/status?status=CONCLUIDO`);
            setPedidos(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };

    const togglePopup = () => {
        setIsPopupOpen(prev => !prev);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating); // Atualiza a avaliação
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            navigate('/cadastro');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    const editarEndereco = (id) => {
        // Lógica para editar o endereço, pode redirecionar para um formulário de edição
        navigate(`/editar-endereco/${id}`); // Exemplo de redirecionamento
    };

    const removerEndereco = async (id) => {
        // Lógica para remover o endereço
        try {
            await api.delete(`/enderecos/${id}`); // Ajuste a URL de acordo com sua API
            fetchEnderecos(); // Atualiza a lista de endereços após a remoção
        } catch (error) {
            console.error('Erro ao remover endereço:', error);
        }
    };

    const renderContent = () => {
        switch (itemSelecionado) {
            case 'Geral':
                return (
                    <div className={styles["detalhesGeral"]}>
                        <h2>Informações da conta</h2>
                        <div className={styles["contaInfo"]}>
                            <p><strong>Nome</strong><br />{localStorage.getItem('userName')}</p>
                            <p><strong>Endereço de e-mail</strong><br />{localStorage.getItem('userEmail')}</p>
                        </div>
                    </div>
                );

            case 'Meus Endereços':
                return (
                    <div className={styles["detalhesEndereco"]}>
                        <h2>Meus Endereços</h2>
                        <div className={styles["enderecosContainer"]}>
                            {Array.isArray(enderecos) && enderecos.length > 0 ? (
                                enderecos.map((endereco) => (
                                    <div key={endereco.id} className={styles["enderecoInfo"]}>
                                        <p><strong>Nome</strong><br />{endereco.apelido}</p>
                                        <p><strong>Local</strong><br />{endereco.rua}</p>
                                        <p><strong>Cidade</strong><br />{endereco.cidade}</p>
                                        <div className={styles["acoesEndereco"]}>
                                            <button onClick={() => editarEndereco(endereco.id)} className={styles["editarBtn"]}>Editar</button>
                                            <button onClick={() => removerEndereco(endereco.id)} className={styles["deletarBtn"]}>Deletar</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhum endereço encontrado.</p>
                            )}
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

                                    {/* Star Rating Component */}
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
                                    
                                    <textarea rows="1" placeholder="Avaliar:"></textarea>
                                    <button className={styles["botaoEnviar"]} onClick={togglePopup}>
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