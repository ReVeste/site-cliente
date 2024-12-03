import React from 'react';
import logo from '../../assets/iconeLUA.png';
import visa from '../../assets/bandeiras/visa.png';
import mastercard from '../../assets/bandeiras/mastercard.png';
import express from '../../assets/bandeiras/express.jpg';
import mercadopago from '../../assets/bandeiras/mercadopago.png';
import elo from '../../assets/bandeiras/elo.png';
import pix from '../../assets/bandeiras/pix.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footerLogo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="footerContent">
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
                <img src={express} alt="American Express" />
                <img src={mercadopago} alt="Mercado Pago" />
                <img src={elo} alt="Elo" />
                <img src={pix} alt="Pix" />
            </div>
        </footer>
    );
};

export default Footer;