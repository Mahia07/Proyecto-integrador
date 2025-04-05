import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHoteles, updateHotel } from "../../Api/api";

function UpdateHotelForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState({
    name: "",
    star_rating: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'

  useEffect(() => {
    const fetchHotel = async () => {
      const allHotels = await getHoteles();
      const selectedHotel = allHotels.find((h) => h.id === parseInt(id));
      if (selectedHotel) {
        setHotelData({
          name: selectedHotel.name,
          star_rating: selectedHotel.star_rating,
          description: selectedHotel.description,
        });
      } else {
        setMessage("Hotel no encontrado");
        setMessageType("error");
      }
    };
    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Debes iniciar sesión como administrador");
      setMessageType("error");
      return;
    }

    const response = await updateHotel(token, id, hotelData);

    if (response?.message) {
      setMessage("Hotel actualizado correctamente");
      setMessageType("success");
      // setTimeout(() => navigate("/hoteles"), 1500);
    } else {
      setMessage("Error al actualizar el hotel");
      setMessageType("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Actualizar Hotel</h2>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          name="name"
          className="form-input"
          value={hotelData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Estrellas:</label>
        <input
          type="number"
          name="star_rating"
          className="form-input"
          value={hotelData.star_rating}
          onChange={handleChange}
          required
          min="1"
          max="5"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Descripción:</label>
        <textarea
          name="description"
          className="form-textarea"
          value={hotelData.description}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="form-button">Guardar Cambios</button>
    </form>
  );
}

export default UpdateHotelForm;
