import { Await, data } from "react-router-dom";

export const getHoteles = async () => {
  try {
    const results = await fetch("http://localhost:3000/hoteles");
    const data = await results.json();
    return data;
  } catch (error) {
    console.log("Hubo un error");
    throw error;
  }
};

export const getHotelByNombre = async (nombre) => {
  try {
    const results = await fetch(
      `http://localhost:3000/hotel/busqueda/${nombre}`
    );
    const data = await results.json();
    return data;
  } catch (error) {
    console.log("Hubo un error en la búsqueda de hotel");
    return null;
  }
};

export const postReservation = async ({
  bedroomNames,  
  start_date,
  end_date,
  numberOfNights,
  numberOfPeople,
  hotelName, 
  token,
}) => {
  try {
    const response = await fetch("http://localhost:3000/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bedroomType: bedroomNames,  
        start_date,
        end_date,
        numberOfNights,
        numberOfPeople,
        hotelName,  
      }),
    });

    const responseJson = await response.json();
    console.log("Respuesta del servidor:", responseJson);

    if (!response.ok) {
      throw new Error(responseJson.message || "Error al realizar la reserva");
    }

    return responseJson;
  } catch (error) {
    console.error("Error en postReservation:", error);
    throw error;
  }
};

export const getReservacionesUsuario = async (username, token) => {
  try {
    const response = await fetch(`http://localhost:3000/reservaciones/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("No se encontraron reservaciones.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error obteniendo reservaciones:", error);
    return { activeReservations: [], pastReservations: [] };
  }
};

export const registerUser = async ({
  name,
  email,
  username,
  phoneNumber,
  password,
  role,
}) => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, username, phoneNumber, password, role }),
    });

    const responseText = await response.text();
    console.log("Enviando datos de registro:", {
      name,
      email,
      username,
      phoneNumber,
      password,
    });
    console.log("Respuesta del servidor:", responseText);

    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", responseText);
      throw new Error("Error al registrar el usuario");
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};

export const loginUser = async ({ username, password }) => { 
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json(); 

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    console.log("Token recibido:", data.token); 

    localStorage.setItem("username", username)

    return data; 
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
};

export const getProtectedRoutes = async () => {
  const token  = localStorage.getItem("Token")

  if (!token) {
    throw new Error ('No se porporciono token')
  }

  const response = await fetch("http://localhost:3000/routesProtected", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error("Acceso no autorizado")
  }
  
  return response.json()
}

export const getBedrooms = async () => {
  try {
    const response = await fetch("http://localhost:3000/Bedrooms"); 

    if (!response.ok) {
      throw new Error("Error al obtener las habitaciones");
    }

    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error en getBedrooms:", error);
    throw error;
  }
};
// Admin routes

// api.js
export function createHotel(hotel) {
  const { name, description, star_rating, img } = hotel;

  const requestBody = {
    name,
    description,
    star_rating,
    img,
  };

  console.log("Body que se enviará al backend:", requestBody);

  const token = localStorage.getItem("token"); // o donde estés guardando el JWT

  return fetch("http://localhost:3000/hotels/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // 👈 Esto es clave
    },
    body: JSON.stringify(requestBody),
  }).then((res) => {
    if (!res.ok) throw new Error("Error en la respuesta del servidor");
    return res.json();
  });
}


// Actualizar un hotel
export const updateHotel = async (token, id, { name, star_rating, description }) => {
  try {
    const response = await fetch(`http://localhost:3000/hotels/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, star_rating, description,  }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el hotel:", error);
  }
};

export const deleteHotel = async (token, id) => {
  try {
    const response = await fetch(`http://localhost:3000/hotels/delete/${id}`, {  // Cambié "/delete" por "/hotels"
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el hotel:", error);
  }
};



export const cancelReservation = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ canceled: true }), 
    });

    const responseText = await response.text();
    console.log("Respuesta del servidor:", responseText);

    if (!response.ok) {
      console.error("Error en la respuesta del servidor:", responseText);
      throw new Error("Error al cancelar la reserva");
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error en cancelReservation:", error);
    throw error;
  }
};

