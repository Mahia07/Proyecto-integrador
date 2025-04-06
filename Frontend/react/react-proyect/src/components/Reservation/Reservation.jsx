import React, { useState, useEffect } from "react";
import { postReservation } from "../../Api/api";

const Reservation = () => {
  const [formData, setFormData] = useState({
    bedroomNames: "",
    start_date: "",
    end_date: "",
    numberOfNights: 1,
    numberOfPeople: 1,
    hotelName: "",
  });

  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    } else {
      setMessage("Debe iniciar sesión para hacer una reserva.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !username) {
      setMessage("Debe iniciar sesión para hacer una reserva.");
      return;
    }

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      setMessage("La fecha de fin debe ser posterior a la fecha de inicio.");
      return;
    }

    setMessage("Enviando reserva...");

    try {
      const response = await postReservation({
        ...formData,
        bedroomType: formData.bedroomNames.split(",").map((name) => name.trim()),
        token,
        username,
      });

      setMessage(response.message || "Reserva realizada con éxito");
    } catch (error) {
      setMessage(error.message || "Error al realizar la reserva");
    }
  };

  return (
    <div className="reservationPage">
      <h2 className="reservationTitle">Reservar</h2>

      <div className="reservationFormWrapper">
        <form onSubmit={handleSubmit} className="reservationForm">
          <h3 className="formSubtitle">Completa la información para reservar</h3>

          {username && (
            <p className="welcomeUser">
              Reservando como: <strong>{username}</strong>
            </p>
          )}

          <div className="formGroup">
            <label>Nombre del hotel:</label>
            <input
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Habitaciones (separadas por coma):</label>
            <input
              type="text"
              name="bedroomNames"
              value={formData.bedroomNames}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Fecha de inicio:</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Fecha de fin:</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Noches:</label>
            <input
              type="number"
              name="numberOfNights"
              value={formData.numberOfNights}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="formGroup">
            <label>Personas:</label>
            <input
              type="number"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <button type="submit" className="submitButton">
            Reservar
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Reservation;
