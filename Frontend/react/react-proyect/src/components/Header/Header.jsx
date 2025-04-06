import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getHotelByNombre } from "../../Api/api";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    setIsAdmin(userRole === "Admin");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setHotel(null);

    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) {
      setError("Ingrese un nombre de hotel.");
      return;
    }

    try {
      const data = await getHotelByNombre(searchTerm);
      if (Array.isArray(data) && data.length > 0) {
        setHotel(data[0]);
      } else {
        throw new Error("Hotel no encontrado");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="header-container">
      <div className="overlay"></div>
      <div className="header-content">
        <h1 className="title">TU HOTEL</h1>
        <p className="subtitle">Sistema de reserva de hoteles</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      {hotel && (
        <div className="hotelCard">
          <h3>{hotel.name}</h3>
          <div className="hotelCardBody">
            <p><strong>Ubicación:</strong> {hotel.location}</p>
            <p><strong>Precio:</strong> ${hotel.price} por noche</p>
            <p><strong>Descripción:</strong> {hotel.description}</p>
            <p><strong>Estrellas:</strong> {hotel.star_rating}</p>
            <p><strong>Calificación Promedio:</strong> {hotel.average_rating}</p>
            <p><strong>Amenidades:</strong> {hotel.amenities?.join(', ') || 'No especificadas'}</p>
          </div>
        </div>
      )}

      <nav className="nav">
        <ul>
          <li className="navLink">
            <Link to="/">Inicio</Link>
          </li>
          <li className="navLink">
            <Link to="/reservaciones/:username">Reservaciones</Link>
          </li>
          <li className="navLink">
            <form onSubmit={handleSearch} className="search-form hide-on-small">
              <input
                type="text"
                placeholder="Buscar hotel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">Buscar</button>
            </form>
          </li>

      
            <>
              <li className="navLink">
                <Link to="/hotels/create">Crear Hotel</Link>
              </li>
              <li>
                <p onClick={handleLogout} className="logoutButton">Cerrar sesión</p>
              </li>
            </>
          

          {!isLoggedIn && (
            <>
              <li className="navLink">
                <Link to="/register">Registrarse</Link>
              </li>
              <li className="navLink">
                <Link to="/login">Iniciar sesión</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
