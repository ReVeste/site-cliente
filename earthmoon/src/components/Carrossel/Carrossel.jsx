import React, { useState, useEffect } from 'react';
import './Carrossel.css';
import api from '../../Api';

const Carrossel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerSlide = 3;  // Define quantas reviews mostrar por vez

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/feedbacks');
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error('Erro ao buscar feedback:', error);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // Se o índice ultrapassar o limite, vai para o início
      return nextIndex >= reviews.length ? 0 : nextIndex;
    });
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexResult = prevIndex - 1;
      // Se o índice for menor que zero, vai para o final
      return prevIndexResult < 0 ? reviews.length - 1 : prevIndexResult;
    });
  };

  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    // Fazendo o "loop" circular para mostrar sempre 3 resenhas
    const visibleReviews = [];
    for (let i = 0; i < reviewsPerSlide; i++) {
      visibleReviews.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visibleReviews;
  };

  return (
    <div className="carrossel">
      <button className="carrossel-control-left" onClick={prevReview}>
        ◄
      </button>

      <div className="carrossel-inner">
        {getVisibleReviews().map((review) => (
          <div key={review.id} className="review-container">
            <div className="review-header">
              <div className="stars">
                {[...Array(review.nota)].map((_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
              <div className="review-info">
                <h3>{review.usuario.nome}</h3>
              </div>
            </div>
            <div className="review-text">
              <p>{review.comentario}</p>
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