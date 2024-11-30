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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoEndereco((prev) => ({ ...prev, [name]: value }));
    };
    
    const adicionarEndereco = (novoEndereco) => {
        // Lógica para adicionar o novo endereço, exemplo:
        setEnderecos([...enderecos, novoEndereco]);
        setMostrarFormulario(false);  // Esconde o formulário após adicionar o endereço
    };
    
    const resetFormulario = () => {
        setNovoEndereco({ apelido: '', CEP: '', cidade: '', estado: '', rua: '', bairro: '' });
        setEditandoEndereco(null);
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

    const editarEndereco = (id) => {
        navigate(`/editar-endereco/${id}`);
    };

    const removerEndereco = async (id) => {
        try {
            await api.delete(`/enderecos/${id}`);
            fetchEnderecos();
        } catch (error) {
            console.error('Erro ao remover endereço:', error.response?.data);
        }
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

                case 'Meus Endereços':
    return (
        <div className={styles["detalhesEndereco"]}>
            <h2>Meus Endereços</h2>

            {/* Só exibe o botão de adicionar se o número de endereços for menor que 2 */}
            {enderecos.length < 2 && !mostrarFormulario && (
                <button className={styles["adicionarEndereco"]} onClick={() => setMostrarFormulario(true)}>
                    Adicionar Novo Endereço
                </button>
            )}

            <div className={styles["enderecosFormularioContainer"]}>
                <div className={styles["enderecosContainer"]}>
                    {enderecos.length > 0 ? (
                        enderecos.map((endereco, index) => (
                            <div key={index} className={styles["enderecoInfo"]}>
                                <p><strong>Nome:</strong> {endereco.apelido}</p>
                                <p><strong>Rua:</strong> {endereco.rua}</p>
                                <p><strong>Cidade:</strong> {endereco.cidade}</p>
                                <div className={styles["acoesEndereco"]}>
                                    <button onClick={() => editarEndereco(endereco.id)} className={styles["editarBtn"]}>Editar</button>
                                    <button onClick={() => removerEndereco(endereco.id)} className={styles["deletarBtn"]}>Deletar</button>
                                </div>
                            </div>
                        ))
                    ) : null}
                </div>

                {/* Exibe o formulário de adicionar/editar endereço */}
                {mostrarFormulario && (
                    <div className={styles["formularioEndereco"]}>
                        <h3>{editandoEndereco ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</h3>
                        <input
                            type="text"
                            name="apelido"
                            placeholder="Apelido"
                            value={novoEndereco.apelido}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="cep"
                            placeholder="CEP"
                            value={novoEndereco.cep}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="estado"
                            placeholder="Estado"
                            value={novoEndereco.estado}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="cidade"
                            placeholder="Cidade"
                            value={novoEndereco.cidade}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="bairro"
                            placeholder="Bairro"
                            value={novoEndereco.bairro}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="rua"
                            placeholder="Rua"
                            value={novoEndereco.rua}
                            onChange={handleChange}
                        />
                        
                        <button onClick={adicionarEndereco}>
                            {editandoEndereco ? 'Salvar' : 'Adicionar'}
                        </button>
                        {editandoEndereco && (
                            <button onClick={resetFormulario} className={styles["cancelarBtn"]}>
                                Cancelar
                            </button>
                        )}
                    </div>
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