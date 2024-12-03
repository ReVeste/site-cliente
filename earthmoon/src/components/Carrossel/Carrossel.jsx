import React, { useState, useEffect } from 'react';
import './Carrossel.css';
import api from '../../Api';

const Carrossel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerSlide = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/feedbacks');
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error('Erro ao buscar feedback:', error.response?.data);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= reviews.length ? 0 : nextIndex;
    });
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexResult = prevIndex - 1;
      return prevIndexResult < 0 ? reviews.length - 1 : prevIndexResult;
    });
  };

  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    const visibleReviews = [];
    for (let i = 0; i < reviewsPerSlide; i++) {
      visibleReviews.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visibleReviews;
  };

  return (
    <div className="carrossel" role="region" aria-label="Carrossel de feedbacks">
      <button
        className="carrossel-control-left"
        onClick={prevReview}
        aria-label="Mostrar feedbacks anteriores"
        aria-controls="carrossel-content"
      >
        ◄
      </button>

      <div
        className="carrossel-inner"
        id="carrossel-content"
        role="list"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions removals"
      >
        {getVisibleReviews().map((review, index) => (
          <div
            key={review.id}
            className="review-container"
            role="listitem"
            aria-labelledby={`review-${index}`}
          >
            <div className="review-header" id={`review-${index}`}>
              <div className="stars" aria-label={`Nota: ${review.nota} estrelas`}>
                {[...Array(review.nota)].map((_, i) => (
                  <span key={i} className="star" aria-hidden="true">
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

      <button
        className="carrossel-control-right"
        onClick={nextReview}
        aria-label="Mostrar próximos feedbacks"
        aria-controls="carrossel-content"
      >
        ►
      </button>
    </div>
  );
};

export default Carrossel;