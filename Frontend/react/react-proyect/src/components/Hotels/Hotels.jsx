import React, { useState, useEffect } from "react";
import { getHoteles, deleteHotel } from "../../Api/api";
import { Link, useNavigate } from "react-router-dom";


function Hotels() {
  const [Hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      if (!navigator.onLine) {
        setError("No se detectó conexión a internet");
        return;
      }

      try {
        const data = await getHoteles();
        setHotels(data);
        setError(null);
      } catch (error) {
        setError("Error al obtener Hoteles, intente más tarde");
      }
    };
    fetchHotels();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión como administrador");
      return;
    }

    if (!window.confirm("¿Estás seguro de que quieres eliminar este hotel?")) return;

    try {
      const response = await deleteHotel(token, id);
      if (response?.message) {
        alert(response.message);
        setHotels(Hotels.filter((hotel) => hotel.id !== id));
      } else {
        alert("No se pudo eliminar el hotel");
      }
    } catch (error) {
      alert("Ocurrió un error al eliminar el hotel");
    }
  };

  return (
    <section className="hotels-section">
      <h2 className="hotels-title">Hoteles Disponibles</h2>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className={`hotels-grid ${Hotels.length === 1 ? "single-card" : ""}`}>
          {Hotels.map((hotel) => {
            if (!hotel || !hotel.id) return null;

            return (
              <div key={hotel.id} className="hotel-card">
                <Link to={`/Bedrooms`} className="hotel-info">
                  <img
                    className="hotel-image"
                    src={hotel.img || "/img/default-hotel.jpg"}
                    alt={hotel.name || "Hotel"}
                  />
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <p className="hotel-rating">
                    Estrellas del Hotel: {hotel.star_rating}
                  </p>
                  <p className="hotel-location">
                    {hotel.Ubicacion?.city || "Ciudad desconocida"},{" "}
                    {hotel.Ubicacion?.country || "País desconocido"}
                  </p>

                  <div className="hotel-opinions">
                    {hotel.Opinions?.slice(0, 2).map((opinion, index) => (
                      <div key={index} className="hotel-opinion">
                        <p>"{opinion.review}"</p>
                        <p>Calificación: {opinion.rating}</p>
                      </div>
                    ))}
                  </div>
                </Link>

                <div className="buttons-container">
                  <button
                    className="hotel-button"
                    onClick={() => navigate("/reservation")}
                  >
                    Reservar
                  </button>
                  <button
                    className="hotel-button"
                    onClick={() => navigate(`/hotels/update/${hotel.id}`)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="hotel-button delete"
                    onClick={() => handleDelete(hotel.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Hotels;
