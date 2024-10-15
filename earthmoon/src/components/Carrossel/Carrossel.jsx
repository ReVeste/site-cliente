// src/components/Carrossel.jsx
import React, { useState } from 'react';
import './Carrossel.css';

const reviews = [
  {
    name: 'Ana Oliveira',
    stars: 5,
    text: 'Perfeito! Entrega rápida, produto de alta qualidade. Superou minhas expectativas!',
  },
  {
    name: 'João Pereira',
    stars: 4,
    text: 'A entrega podia ser melhor.',
  },
  {
    name: 'Maria Silva',
    stars: 3,
    text: 'O produto é ok, mas esperava algo diferente.',
  },
  {
    name: 'Lucas Souza',
    stars: 4,
    text: 'Produto bom, mas o suporte poderia ser mais rápido.',
  },
  {
    name: 'Carlos Mendes',
    stars: 5,
    text: 'Excelente! Superou as expectativas!',
  },
  {
    name: 'Juliana Costa',
    stars: 2,
    text: 'Produto deixou a desejar, não atende às necessidades.',
  },
];

const Carrossel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerSlide = 3;

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + reviewsPerSlide) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - reviewsPerSlide + reviews.length) % reviews.length
    );
  };

  return (
    <div className="carrossel">
      {/* Setas de navegação */}
      <button className="carrossel-control-left" onClick={prevReview}>
        ◄
      </button>

      <div className="carrossel-inner">
        {reviews
          .slice(currentIndex, currentIndex + reviewsPerSlide)
          .map((review, index) => (
            <div key={index} className="review-container">
              <div className="review-header">
                <div className="stars">
                  {[...Array(review.stars)].map((_, i) => (
                    <span key={i} className="star">
                      ★
                    </span>
                  ))}
                </div>
                <div className="review-info">
                  <h3>{review.name}</h3>
                </div>
              </div>
              <div className="review-text">
                <p>{review.text}</p>
              </div>
            </div>
          ))}
      </div>

      <button className="carrossel-control-right" onClick={nextReview}>
        ►
      </button>
    </div>
  );
};

export default Carrossel;
