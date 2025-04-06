import React, { useEffect, useState } from "react";
import { getBedrooms } from "../../Api/api"; 

const BedroomsList = () => {
  const [bedrooms, setBedrooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBedrooms = async () => {
      try {
        const data = await getBedrooms();
        setBedrooms(data);
      } catch (err) {
        setError("Error al cargar las habitaciones.");
        console.error(err);
      }
    };

    fetchBedrooms();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
 <>
   <h1 className="titleBedrooms">Habitaciones</h1> 
    <div className="bedrooms-container">
      {bedrooms.map((room) => (
        <div className="bedroom-card" key={room.id}>
          <h3 className="bedroom-title">{room.nombre}</h3>
          <img className="bedroom-img" src={room.img} alt={room.nombre} />
          <p className="bedroom-info">Tipo: {room.type}</p>
          <p className="bedroom-info">Precio: ${room.precio}</p>
        </div>
      ))}
    </div>
 </>
  );
};

export default BedroomsList;
