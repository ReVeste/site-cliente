import React, { useState } from 'react';
import './ProductsRegister.css';
import api from '../../Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const ProductsRegister = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate(); 

  
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

  const uploadImages = async (images) => {
    const uploadPromises = images.map((image) => {
      const formCloud = new FormData();
      formCloud.append("file", image);
      formCloud.append("upload_preset", "produtos");
      
      return axios.post(process.env.REACT_APP_CLOUDINARY_URL, formCloud)
        .then((response) => response.data.secure_url)
        .catch((error) => {
          console.error("Erro no upload:", error.response?.data || error.message);
          return null;
        });
    });

    const urls = await Promise.all(uploadPromises);
    console.log('URLs:', urls);
    console.log('URLs válidas:', urls.filter(url => url !== null));
    return urls.filter(url => url !== null);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description || !formData.price || formData.images.length === 0) {
      console.error("Preencha todos os campos corretamente.");
      return;
    }

    const urls = await uploadImages(formData.images);
    console.log('urls:', urls);
    await setImageUrls(urls);

    console.log('urls:', urls);
    if (urls.length !== formData.images.length) {
      console.error("Erro no upload de algumas imagens.");
      return;
    }

    api.post('/produtos', {
      nome: formData.title,
      categoria: formData.category,
      descricao: formData.description,
      marca: formData.brand,
      preco: parsePrice(formData.price),
      images: urls,
      qtdEstoque: formData.stock || 1,
      status: 'DISPONIVEL'
    })
    .then(response => console.log('Cadastro bem-sucedido:', response.data))
    .catch(error => console.error('Erro no cadastro:', error.response?.data));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePriceChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, '');
    let formattedPrice = (Number(rawValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      price: formattedPrice
    }));
  };

  const parsePrice = (formattedPrice) => {
    return parseFloat(formattedPrice.replace(/\D/g, '')) / 100;
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

  const handleDragStart = (e, index) => {
    dragIndex = index;
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (dragIndex !== index) {
      swapImages(dragIndex, index);
    }
  };

  let dragIndex = null;

  return (
    <div className="product-register-container">
       <button 
        type="button" 
        onClick={() => navigate('/configuracao-eduarda')} 
        className="back-button"
        aria-label="Voltar para configurações"
      >
        ← Voltar
      </button>
      <div className="image-upload-section">
        <h3 id="image-upload-heading">Imagens do Produto</h3>

        <div className="main-image-box" aria-labelledby="image-upload-heading">
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            id="mainImageUpload"
            aria-describedby="mainImageDescription"
          />
          <label htmlFor="mainImageUpload" className="upload-label">
            {formData.images.length === 0 ? (
              <>
                <span className="upload-icon"></span>
                <span id="mainImageDescription">Clique para adicionar a imagem principal</span>
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
            <button className="remove-image"
              onClick={() => removeImage(0)}
              aria-label="Remover imagem principal"
            >
              Remover
            </button>
          )}
        </div>

        <div className="additional-images-container" aria-labelledby="additionalImagesHeading">
          <h4 id="additionalImagesHeading">Imagens Adicionais</h4>
          {formData.images.slice(1).map((image, index) => (
            <div
              className="additional-image-box"
              key={index + 1}
              draggable
              onDragStart={(e) => handleDragStart(e, index + 1)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index + 1)}
              aria-labelledby={`image-${index + 1}-label`}
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Imagem Adicional ${index + 1}`}
                className="additional-image"
              />
              <button className="remove-image"
                onClick={() => removeImage(index + 1)}
                aria-label={`Remover imagem adicional ${index + 1}`}
              >
                Remover
              </button>
            </div>
          ))}
          {formData.images.length < 4 && (
            <div className="additional-upload" onClick={() => document.getElementById('additionalImageUpload').click()} aria-label="Adicionar imagens adicionais">
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
            aria-describedby="additionalImagesDescription"
          />
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit} aria-labelledby="form-title">
        <h2 id="form-title">Cadastro de Produto</h2>

        <label htmlFor="title">TÍTULO DO PRODUTO</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Digite o título do produto"
          value={formData.title}
          onChange={handleChange}
          required
          aria-required="true"
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
            aria-disabled={formData.noBrand}
          />
          <label>
            <input
              type="checkbox"
              name="noBrand"
              checked={formData.noBrand}
              onChange={handleChange}
              aria-label="Produto sem marca"
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
          aria-required="true"
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
          aria-required="true"
        />

        <label htmlFor="category">CATEGORIA</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
          aria-required="true"
        >
          <option value="" disabled>Selecione a Categoria</option>
          <option value="ROUPA">Roupas</option>
          <option value="ACESSORIO">Acessórios</option>
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
              aria-required="true"
            />
          </>
        )}

        <button type="submit" className="submit-button" aria-label="Salvar produto">Salvar</button>
      </form>
    </div>
  );
};

export default ProductsRegister;