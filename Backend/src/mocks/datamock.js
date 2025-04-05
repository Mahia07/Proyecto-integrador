import { Sequelize } from "sequelize";
import { Reservations } from "../models/reservas.js";
import { Location } from "../models/ubicacion.js";
import { Hotels } from "../models/hoteles.js";
import { Bedrooms } from "../models/habitaciones.js";
import { Characteristics } from "../models/comodidades.js";
import { Opinions } from "../models/opiniones.js";
import { Payments } from "../models/pagos.js";
import { BedroomsDiscount } from "../models/ofertas_habitaciones.js";
import { sequelize } from "../config/database.js";

export const InitializeData = async () => {
  try {
    await sequelize.sync({ force: true });

    const Locations = await Location.bulkCreate([
      {
        id: 1,
        city: "Bahía Solano",
        country: "Colombia",
        address: "Carrera 2 #45-67, Zona Costera, Bahía Solano, Chocó"
      },
      {
        id: 2,
        city: "Villa de Leyva",
        country: "Colombia",
        address: "Calle 10 #7-89, Centro Histórico, Villa de Leyva, Boyacá"
      },
      {
        id: 3,
        city: "El Cocuy",
        country: "Colombia",
        address: "Kilómetro 3 vía al Parque Nacional, El Cocuy, Boyacá"
      },
    ]);

    const Hotel = await Hotels.bulkCreate([
      {
        id: 1,
        name: "Gran Hotel del Pacífico",
        star_rating: 5,
        average_rating: 8.7,
        description: "Un hotel de lujo con vistas impresionantes al océano y servicio de clase mundial.",
        img: "https://res.cloudinary.com/dy4uktw9u/image/upload/t_Hotel1/v1743432871/Hotel1_c2ccss.jpg",
        ubicacionId: 1,
      },
      {
        id: 2,
        name: "Refugio de la Montaña",
        star_rating: 5,
        average_rating: 8.7,
        description: "Un lugar acogedor ideal para los amantes de la naturaleza y la tranquilidad.",
        img: "https://res.cloudinary.com/dy4uktw9u/image/upload/t_Hotel2/v1743433649/Hotel2_iojrxw.jpg",
        ubicacionId: 2,
      },
      {
        id: 3,
        name: "Hotel Aurora Boreal",
        star_rating: 3,
        average_rating: 3.9,
        description: "Un hotel con una vista privilegiada de los cielos despejados, perfecto para los aventureros.",
        img: "https://res.cloudinary.com/dy4uktw9u/image/upload/t_Hotel2/v1743433831/Hotel3_kkykkr.jpg",
        ubicacionId: 3
      },
    ]);

    const Bedroom = await Bedrooms.bulkCreate([
      { id: 1, type: "Habitación Doble", price_night: 500, hotelId: 1, img:"https://res.cloudinary.com/dy4uktw9u/image/upload/c_fill,w_257,h_342/v1743535744/Habitacion1_Hotel1_glndmj.jpg" },
      { id: 2, type: "Habitacion Doble", price_night: 147, hotelId: 2, img:"https://res.cloudinary.com/dy4uktw9u/image/upload/c_fill,w_257,h_342/v1743537257/Habitacion1_Hotel2_sz9sa5.jpg" },
    ]);

    const opinions = await Opinions.bulkCreate([
      { id: 1, rating: 5, review: "¡Excelente!", hotelId: 1, usuarioId: 1 },
      { id: 2, rating: 4, review: "Muy bueno", hotelId: 2, usuarioId: 2 },
      { id: 3, rating: 4, review: "Bien ", hotelId: 3, usuarioId: 2 },
    ]);

    const reservations = await Reservations.bulkCreate([
      {
        id: 1,
        username: "Camilo17",
        start_date: "2025-04-01",
        end_date: "2025-04-06",
        numberOfNights: 5,
        numberOfPeople: 2,
        usuarioId: 4,
      },
      {
        id: 2,
        username: "María",
        start_date: "2025-05-10",
        end_date: "2025-05-15",
        numberOfNights: 5,
        numberOfPeople: 3,
        usuarioId: 2,
      },
    ]);

    await sequelize.models.ReservaHabitacion.bulkCreate([
      { habitacionId: 1, reservaId: 1 },
      { habitacionId: 2, reservaId: 2 },
    ]);

    const payments = await Payments.bulkCreate([
      {
        id: 1,
        amount: 2500,
        payment_method: "Tarjeta de crédito",
        reservaId: 1,
      },
      { id: 2, amount: 735, payment_method: "PayPal", reservaId: 2 },
    ]);

    const characteristic = await Characteristics.bulkCreate([
      { id: 1, name: "WiFi", description: "Conexión a internet" },
      {
        id: 2,
        name: "Desayuno incluido",
        description: "Incluye desayuno gratuito",
      },
    ]);

    await sequelize.models.HabitacionComodidad.bulkCreate([
      { habitacionId: 1, caracteristicaId: 1 },
      { habitacionId: 2, caracteristicaId: 2 },
    ]);
    const bedRoomDiscount = await BedroomsDiscount.bulkCreate([
      {
        id: 1,
        discount: 10,
        roomId: 1,
        start_date: "2025-04-01",
        end_date: "2025-04-05",
      },
      {
        id: 2,
        discount: 15,
        roomId: 2,
        start_date: "2025-04-10",
        end_date: "2025-04-15",
      },
    ]);
  } catch (error) {
    // console.log('Error al insertar en la base de datos')
  }
};
InitializeData();
