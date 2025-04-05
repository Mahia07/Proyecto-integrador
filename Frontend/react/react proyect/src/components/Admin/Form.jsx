import React, { useState } from 'react';
import { createHotel } from '../../Api/api'; // Asegúrate de que la ruta sea correcta

const Form = () => {
  const [hotelData, setHotelData] = useState({
    name: '',
    star_rating: '',
    description: '',
    img: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'star_rating' && (value < 1 || value > 5)) {
      console.warn("La calificación de estrellas debe ser un número entre 1 y 5.");
    }

    setHotelData({
      ...hotelData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, star_rating, description, img } = hotelData;

    if (!name || !star_rating || !description || !img) {
      setErrorMessage("Por favor completa todos los campos.");
      setSuccessMessage('');
      return;
    }

    try {
      const response = await createHotel(hotelData);
      setSuccessMessage("¡Hotel creado exitosamente!");
      setErrorMessage('');
      setHotelData({ name: '', star_rating: '', description: '', img: '' });
    } catch (error) {
      console.error("Error al crear hotel:", error);
      setErrorMessage("Ocurrió un error al crear el hotel.");
      setSuccessMessage('');
    }
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Crear nuevo hotel</h2>

      {successMessage && <p className="form-success">{successMessage}</p>}
      {errorMessage && <p className="form-error">{errorMessage}</p>}

      <div className="form-group">
        <label>Nombre del Hotel:</label>
        <input
          type="text"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Estrellas del Hotel:</label>
        <input
          type="number"
          name="star_rating"
          value={hotelData.star_rating}
          onChange={handleChange}
          min="1"
          max="5"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Descripción del Hotel:</label>
        <textarea
          name="description"
          value={hotelData.description}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label>URL de la imagen:</label>
        <input
          type="text"
          name="img"
          value={hotelData.img}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <button type="submit" className="form-button">Enviar Hotel</button>
    </form>
  );
};

export default Form;
