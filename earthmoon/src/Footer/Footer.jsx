import React from 'react';
import logo from '../assets/iconeLUA.png';
import visa from '../assets/teste.jpg';
import mastercard from '../assets/teste.jpg';
import amex from '../assets/teste.jpg';
import diners from '../assets/teste.jpg';
import elo from '../assets/teste.jpg';
import pix from '../assets/teste.jpg';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footerLogo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="footerContent">
                <div className="footerSection">
                    <h4>INFORMAÇÃO</h4>
                    <ul>
                        <li><a href="#terms">Termos de Uso</a></li>
                        <li><a href="#care">Como cuidar da sua peça</a></li>
                        <li><a href="#measure">Como medir</a></li>
                    </ul>
                </div>
                <div className="footerSection">
                    <h4>ENTRE EM CONTATO</h4>
                    <ul>
                        <li>REVESTE.tech@outlook.com</li>
                    </ul>
                </div>
            </div>
            <div className="footerPayments">
                <img src={visa} alt="Visa" />
                <img src={mastercard} alt="Mastercard" />
                <img src={amex} alt="American Express" />
                <img src={diners} alt="Diners Club" />
                <img src={elo} alt="Elo" />
                <img src={pix} alt="Pix" />
            </div>
        </footer>
    );
};

export default Footer;