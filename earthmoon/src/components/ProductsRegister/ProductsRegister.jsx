import React, { useState } from 'react';
import './ProductsRegister.css';
import api from '../../Api';
import axios from 'axios';
// import { upload } from '@testing-library/user-event/dist/upload';

const ProductsRegister = () => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    noBrand: false,
    description: '',
    category: '',
    images: [],
    price: '',
    stock: ''
  });

  const uploadImage = () => {
  // Iterar sobre as imagens, uma por uma
  formData.images.forEach((image) => {
    const formCloud = new FormData();
    formCloud.append("file", image); // Enviar uma imagem por vez
    formCloud.append("upload_preset", "produtos");

    axios.post(process.env.REACT_APP_CLOUDINARY_URL, formCloud)
      .then((response) => {
        console.log("Upload bem-sucedido:", response);
      })
      .catch((error) => {
        console.error("Erro no upload:", error);
      });
  });
}


  const handleProduto = (e) => {
    console.log('teste: ' + parsePrice(formData.price));
    api.post('/produtos', {
      nome: formData.title,
      categoria: (formData.category).toUpperCase(),
      descricao: formData.description,
      preco: parsePrice(formData.price),
      imagens: formData.images,
      qtdEstoque: formData.stock,
      status: 'DISPONIVEL'
    })
      .then(response => {
        console.log('Cadastro bem-sucedido:', response.data);
      })
      .catch(error => {
        console.error('Erro no cadastro:', error.response.data);
      });
  };

  let dragIndex = null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const formatPrice = (value) => {
    value = value.replace(/\D/g, '');

    const formattedValue = (value / 100).toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      .replace('.', ',');

    return formattedValue;
  };

  const parsePrice = (formattedValue) => {
    const cleanValue = formattedValue.replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanValue);
  };

  const handlePriceChange = (e) => {
    const formattedPrice = formatPrice(e.target.value);
    setFormData({ ...formData, price: formattedPrice });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images, ...files];

    if (newImages.length > 4) {
      alert("Você pode adicionar no máximo 4 imagens.");
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
          {formData.images.length < 4 && (
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

        <label htmlFor="price">PREÇO</label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Digite o preço do produto"
          value={formData.price}
          onChange={handlePriceChange}
          required
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

        {formData.category === 'acessorios' && (
          <>
            <label htmlFor="stock">ESTOQUE</label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="Quantidade no estoque"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button onClick={uploadImage} type="submit" className="submit-button">Salvar</button>
      </form>
    </div>
  );
};

export default ProductsRegister;