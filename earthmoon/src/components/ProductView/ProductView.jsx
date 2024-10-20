import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ProductView.css';

const product = {
  title: 'Manga Longa Oversized Empalador',
  price: '219,90',
  brand: '',
  description: 'TAMANHO G <br> COR PRETA',
  features: 'react features',
  specification: 'bem especifico',
  images: [
    'https://via.placeholder.com/400', // Principal
    'https://via.placeholder.com/400x300', // Adicional 1
    'https://via.placeholder.com/300x200', // Adicional 2
    'https://via.placeholder.com/200x200', // Adicional 3
    'https://via.placeholder.com/100x100', // Adicional 4
  ]
};

const ProductView = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('features'); // Estado para alternar o conteúdo

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="product-container">

      {/* Conteúdo da imagem e detalhes já existente */}

      <div className="product-main-info">
        <div className="imagens-box">
          <div className="product-main-image">
            <img
              src={product.images[0]}
              alt={product.title}
              onClick={() => handleImageClick(0)}
              style={{ cursor: 'pointer' }}
              className="main-image"
            />
          </div>

          <div className="additional-images-vertical">
            {product.images.slice(1, 4).map((image, index) => (
              <div className="additional-image-box" key={index}>
                <img
                  src={image}
                  alt={`Imagem Adicional ${index + 1}`}
                  className="additional-image"
                  onClick={() => handleImageClick(index + 1)}
                  style={{ cursor: 'pointer' }}
                />
                {index === 2 && product.images.length > 4 && (
                  <div className="more-images" onClick={() => handleImageClick(4)}>
                    +{product.images.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">{"R$: " + product.price}</p>
          <p className="product-brand">{product.brand ? product.brand : "Sem Marca"}</p>
          <p
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
          <button className="buy-button">Comprar</button>
        </div>
      </div>

      <div className="caracteriscas-e-especificacoes-box">
  <div className="specifications">
    <button
      className={activeTab === 'features' ? 'active' : ''}
      onClick={() => setActiveTab('features')}
    >
      Características
    </button>
    <button
      className={activeTab === 'specifications' ? 'active' : ''}
      onClick={() => setActiveTab('specifications')}
    >
      Especificações
    </button>
  </div>

  <div className="card">
    {activeTab === 'features' ? (
      <div className="product-features">
        <p>{product.features}</p>
      </div>
    ) : (
      <div className="product-specifications">
        <p>{product.specification}</p>
      </div>
    )}
  </div>
</div>


      {/* Lightbox para visualizar as imagens */}
      {isLightboxOpen && (
        <Lightbox
          mainSrc={product.images[lightboxIndex]}
          nextSrc={product.images[(lightboxIndex + 1) % product.images.length]}
          prevSrc={product.images[(lightboxIndex - 1 + product.images.length) % product.images.length]}
          onCloseRequest={() => setIsLightboxOpen(false)}
          onMovePrevRequest={() => setLightboxIndex((lightboxIndex - 1 + product.images.length) % product.images.length)}
          onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % product.images.length)}
        />
      )}
    </div>
  );
};

export default ProductView;
