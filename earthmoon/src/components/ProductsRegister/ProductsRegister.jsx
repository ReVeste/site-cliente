import React, { useState } from 'react';
import './ProductsRegister.css';

const ProductsRegister = () => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    noBrand: false,
    description: '',
    specification: '',
    features: '',
    category: '',
    images: []
  });

  let dragIndex = null; // Variável global para armazenar o índice da imagem arrastada

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files], // Adiciona as novas imagens ao estado
    }));
  };

  const removeImage = (index) => {
    setFormData((prevData) => {
      const newImages = [...prevData.images];
      newImages.splice(index, 1); // Remove a imagem do índice especificado
      return { ...prevData, images: newImages };
    });
  };

  const swapImages = (dragIndex, hoverIndex) => {
    setFormData((prevData) => {
      const newImages = [...prevData.images];
      const [draggedImage] = newImages.splice(dragIndex, 1); // Remove a imagem arrastada
      newImages.splice(hoverIndex, 0, draggedImage); // Insere a imagem arrastada na nova posição
      return { ...prevData, images: newImages };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted', formData);
  };

  const handleDragStart = (e, index) => {
    dragIndex = index; // Armazena o índice da imagem arrastada
  };

  const handleDrop = (e, index) => {
    e.preventDefault(); // Previne o comportamento padrão
    if (dragIndex !== index) { // Evita swap se soltar na mesma posição
      swapImages(dragIndex, index); // Troca as imagens
    }
  };

  return (
    <div className="product-register-container">

      {/* ____________________ INÍCIO - SEÇÃO DE IMAGENS ____________________ */}
      <div className="image-upload-section">
        <h3>Imagens do Produto</h3>

        {/* Painel da imagem principal */}
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
                <span className="upload-icon">📷</span>
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

        {/* Container de imagens adicionais */}
        <div className="additional-images-container">
          {formData.images.slice(1).map((image, index) => (
            <div
              className="additional-image-box"
              key={index + 1} // Corrigido para manter a indexação correta
              draggable
              onDragStart={(e) => handleDragStart(e, index + 1)} // Passa o índice correto
              onDragOver={(e) => e.preventDefault()} // Permite que o elemento seja soltado aqui
              onDrop={(e) => handleDrop(e, index + 1)} // Passa o índice correto
            >
              <img 
                src={URL.createObjectURL(image)} 
                alt={`Imagem Adicional ${index + 1}`} // Corrigido para refletir o índice correto
                className="additional-image" 
              />
              <button className="remove-image" onClick={() => removeImage(index + 1)}>Remover</button>
            </div>
          ))}
          {/* Botão para adicionar novas imagens adicionais */}
          <div className="additional-upload" onClick={() => document.getElementById('additionalImageUpload').click()}>
            <span className="upload-icon">+</span>
          </div>
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
      {/* ____________________ FIM - SEÇÃO DE IMAGENS ____________________ */}

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
            placeholder="Digite a marca"
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

        <label htmlFor="specification">ESPECIFICAÇÕES</label>
        <textarea
          name="specification"
          id="specification"
          placeholder="Digite as especificações"
          value={formData.specification}
          onChange={handleChange}
        />

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
          <option value="electronics">Eletrônicos</option>
          <option value="furniture">Móveis</option>
          <option value="clothing">Roupas</option>
          {/* Adicione outras opções de categoria aqui */}
        </select>

        <button type="submit" className="submit-button">Salvar</button>
      </form>
    </div>
  );
};

export default ProductsRegister;
