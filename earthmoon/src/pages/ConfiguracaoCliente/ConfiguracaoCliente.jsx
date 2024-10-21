import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ConfiguracaoCliente.module.css';
import home from '../../assets/Home.png';
import avaliacao from '../../assets/avaliacao.png';
import sair from '../../assets/Close.png';
import teste from '../../assets/teste.jpg';
import { useState } from 'react';


const ConfiguracaoCliente = () => {

    const [itemSelecionado, setItemSelecionado] = useState('Geral');

    const itemClicado = (item) => {
        setItemSelecionado(item);
    };

    const [popupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    const enderecos = [
        {
            id: 1,
            nome: 'Casa',
            local: 'Rua Exemplo 123, Apto 45, Bloco B',
            cidade: 'São Paulo - SP'
        },
        {
            id: 2,
            nome: 'Escritório',
            local: 'Av. Brasil, 1500, Sala 20',
            cidade: 'Rio de Janeiro - RJ'
        },

    ];

    const renderContent = () => {

        switch (itemSelecionado) {

            case 'Geral':
                return (
                    <div className={styles["detalhesGeral"]}>
                        <h2>Informações da conta</h2>
                        <div className={styles["contaInfo"]}>
                            <p><strong>Nome</strong><br />Fabiana Nobre Barreto</p>
                            <p><strong>Endereço de e-mail</strong><br />barretos_sp@gmail.com</p>
                        </div>
                    </div>
                );

            case 'Meus Endereços':
                return (
                    <div className={styles["detalhesEndereco"]}>
                        <h2>Meus Endereços</h2>
                        <div className={styles["enderecosContainer"]}>
                            {enderecos.map((endereco) => (
                                <div key={endereco.id} className={styles["enderecoInfo"]}>
                                    <p><strong>Nome</strong><br />{endereco.nome}</p>
                                    <p><strong>Local</strong><br />{endereco.local}</p>
                                    <p><strong>Cidade</strong><br />{endereco.cidade}</p>
                                    <div className={styles["acoesEndereco"]}>
                                        <button className={styles["editarBtn"]}>Editar</button>
                                        <button className={styles["deletarBtn"]}>Deletar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'Minhas Compras':
                return (
                    <div className={styles["detalhesCompras"]}>
                        <h2>Histórico</h2>
                        <div className={styles["comprasInfo"]}>
                            <p><strong>Pedido Vestido</strong><br />Data: 05/09/2024<br />Total: 89,50</p>
                            <p><strong>Pedido Saia</strong><br />Data: 10/10/2024<br />Total: 100,00</p>
                            <img
                                src={avaliacao}
                                alt="Avaliar"
                                className={styles["iconeAvaliacao"]}
                                onClick={togglePopup}
                            />
                        </div>

                        {popupVisible && (
                            <div className={styles["popupContainer"]}>
                                <div className={styles["popupContent"]}>
                                    <img
                                        src={sair}
                                        alt="Sair da Avaliação"
                                        className={styles["iconeSair"]}
                                        onClick={togglePopup}
                                    />

                                    <div className={styles["tituloAvaliacao"]}>
                                        <h2>Avalie sua compra conosco!</h2>
                                        <h3>é rapidinho, e nos ajuda a melhorar a plataforma!</h3>
                                    </div>

                                    <img src={teste} alt="Produto Comprado Imagem" className={styles["imgTeste"]} />

                                    <p><strong>Pedido Vestido</strong><br />Data: 10/10/2024<br />Total: 100,00</p>

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
                            <li>
                                <a href="/">
                                    <img src={home} alt="home" className={styles["home"]} />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    Conta
                                </a>
                            </li>
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
                </div>

                {renderContent()}

            </div>
        </>
    );
}

export default ConfiguracaoCliente;
