import React, { useEffect, useState } from "react";
import { getReservacionesUsuario } from "../../Api/api";

const UserReservations = ({ username, token }) => {
  const [activeReservations, setActiveReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { activeReservations, pastReservations } =
          await getReservacionesUsuario(username, token);

        setActiveReservations(activeReservations);
        setPastReservations(pastReservations);
      } catch (err) {
        setError("No se pudieron obtener las reservaciones");
      }
    };

    fetchReservations();
  }, [username, token]);

  return (
    <div className="reservations-container">
      <h2 className="reservations-title">Mis Reservas</h2>
      {error && <p className="error">{error}</p>}

      <section className="reservations-section">
        <h3 className="reservations-subtitle">Reservas Activas</h3>
        {activeReservations.length === 0 ? (
          <p className="empty-message">No tienes reservas activas.</p>
        ) : (
          <div className="reservations-grid">
            {activeReservations.map((reserva) => (
              <div key={reserva.id} className="reservation-card">
                <img src={reserva.Hotel.img} alt="hotel" />
                <h4>{reserva.Hotel.name}</h4>
                <p>Habitación: {reserva.Bedroom.type}</p>
                <p>Precio/noche: ${reserva.Bedroom.price_night}</p>
                <p>Fecha inicio: {reserva.start_date}</p>
                <p>Fecha fin: {reserva.end_date}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="reservations-section">
        <h3 className="reservations-subtitle">Reservas Pasadas</h3>
        {pastReservations.length === 0 ? (
          <p className="empty-message">No tienes reservas pasadas.</p>
        ) : (
          <div className="reservations-grid">
            {pastReservations.map((reserva) => (
              <div key={reserva.id} className="reservation-card past">
                <img src={reserva.Hotel.img} alt="hotel" />
                <h4>{reserva.Hotel.name}</h4>
                <p>Habitación: {reserva.Bedroom.type}</p>
                <p>Precio/noche: ${reserva.Bedroom.price_night}</p>
                <p>Inicio: {reserva.start_date}</p>
                <p>Fin: {reserva.end_date}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserReservations;
