import React, { useState } from 'react';
import './ProductsRegister.css';

const ProductsRegister = () => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    noBrand: false,
    description: '',
    features: '',
    category: '',
    images: []
  });

  let dragIndex = null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images, ...files];

    // Verifique se o número total de imagens excede 6
    if (newImages.length > 6) {
      alert("Você pode adicionar no máximo 6 imagens.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  const removeImage = (index) => {
    setFormData((prevData) => {
      const newImages = [...prevData.images];
      newImages.splice(index, 1);
      return { ...prevData, images: newImages };
    });
  };

  const swapImages = (dragIndex, hoverIndex) => {
    setFormData((prevData) => {
      const newImages = [...prevData.images];
      const [draggedImage] = newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedImage);
      return { ...prevData, images: newImages };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted', formData);
  };

  const handleDragStart = (e, index) => {
    dragIndex = index;
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (dragIndex !== index) {
      swapImages(dragIndex, index);
    }
  };

  return (
    <div className="product-register-container">
      <div className="image-upload-section">
        <h3>Imagens do Produto</h3>

        <div className="main-image-box">
          <input 
            type="file" 
            accept="image/*"
            style={{ display: 'none' }} 
            onChange={handleImageUpload} 
            id="mainImageUpload"
          />
          <label htmlFor="mainImageUpload" className="upload-label">
            {formData.images.length === 0 ? (
              <>
                <span className="upload-icon"></span>
                <span>Clique para adicionar a imagem principal</span>
              </>
            ) : (
              <img 
                src={URL.createObjectURL(formData.images[0])} 
                alt="Imagem Principal" 
                className="main-image" 
              />
            )}
          </label>
          {formData.images.length > 0 && (
            <button className="remove-image" onClick={() => removeImage(0)}>Remover</button>
          )}
        </div>

        <div className="additional-images-container">
          {formData.images.slice(1).map((image, index) => (
            <div
              className="additional-image-box"
              key={index + 1}
              draggable
              onDragStart={(e) => handleDragStart(e, index + 1)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index + 1)}
            >
              <img 
                src={URL.createObjectURL(image)} 
                alt={`Imagem Adicional ${index + 1}`}
                className="additional-image" 
              />
              <button className="remove-image" onClick={() => removeImage(index + 1)}>Remover</button>
            </div>
          ))}
          {formData.images.length < 6 && (
            <div className="additional-upload" onClick={() => document.getElementById('additionalImageUpload').click()}>
              <span className="upload-icon">+</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            style={{ display: 'none' }} 
            onChange={handleImageUpload} 
            id="additionalImageUpload" 
          />
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <label htmlFor="title">TÍTULO DO PRODUTO</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Digite o título do produto"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="brand">MARCA</label>
        <div className="brand-input">
          <input
            type="text"
            name="brand"
            id="brand"
            placeholder={formData.noBrand ? "Sem marca" : "Digite a marca"}
            value={formData.noBrand ? '' : formData.brand}
            onChange={handleChange}
            disabled={formData.noBrand}
          />
          <label>
            <input
              type="checkbox"
              name="noBrand"
              checked={formData.noBrand}
              onChange={handleChange}
            />
            Produto sem marca
          </label>
        </div>

        <label htmlFor="description">DESCRIÇÃO</label>
        <textarea
          name="description"
          id="description"
          placeholder="Digite a descrição"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <hr />

        <label htmlFor="features">CARACTERÍSTICAS</label>
        <textarea
          name="features"
          id="features"
          placeholder="Digite as características"
          value={formData.features}
          onChange={handleChange}
        />

        <label htmlFor="category">CATEGORIA</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Selecione a Categoria</option>
          <option value="roupas">Roupas</option>
          <option value="acessorios">Acessórios</option>
        </select>

        <button type="submit" className="submit-button">Salvar</button>
      </form>
    </div>
  );
};

export default ProductsRegister;