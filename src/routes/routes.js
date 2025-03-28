import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { Hotels } from "../models/hoteles.js";
import { Location } from "../models/ubicacion.js";
import { Bedrooms } from "../models/habitaciones.js";
import { Characteristics } from "../models/comodidades.js";
import { Opinions } from "../models/opiniones.js";
import { Reservations } from "../models/reservas.js";
import { sequelize } from "../config/database.js";
import {Op} from "sequelize";
//import dotenv from 'dotenv';
import "colors";
import { Sequelize } from "sequelize";

//dotenv.config();
const JWT_SECRET = "mi_secreto_temporal";

const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "Registro exitoso" });
});

router.get("/login", verifyToken, (req, res) => {
  res.json({ mensaje: "Acceso concedido", usuario: req.user });
});

router.get("/Hoteles", async (req, res) => {
  try {
    const hotels = await Hotels.findAll({
      include: [
        {
          model: Location,
          attributes: ["city", "department", "country", "address"],
        },
        {
          model: Bedrooms,
          attributes: ["type", "price_night"],
          include: [
            {
              model: Characteristics,
              through: { attributes: [] },
              attributes: ["description"],
            },
          ],
        },

        {
          model: Opinions,
          attributes: ["rating", "review"],
        },
      ],
    });
    res.json(hotels);
  } catch (error) {
    console.log(error);
  }
});

router.get("/hotel/busqueda/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;

    if (!nombre) {
      return res.status(400).json({ message: "Debe proporcionar un nombre" });
    }

    const hotel = await Hotels.findAll({
      where: {
        name: {
        [Op.like]: `%${nombre}%`
        },
      },
      include: [
        {
          model: Bedrooms,
          attributes: ["type", "price_night", "available"],
        },
      ],
    });

    if (hotel.length === 0) {
      return res.status(404).json({ message: "No se encontró el hotel" });
    }

    res.json(hotel);
  } catch (error) {
    console.error("Error en la búsqueda de hotel:", error);
    res.status(500).json({ message: "Error al obtener hoteles" });
  }
});

router.post("/reservation", verifyToken, async (req, res) => {
  try {
    const { bedroomIds, start_date, end_date, numberOfNights,numberOfPeople, hotelId } = req.body;
    const userId = req.user.id;

    if (!bedroomIds || bedroomIds.length === 0) {
      return res.json({message: 'Escoger al menos una habitacion'})
    }
    const existReservations = await Reservations.findAll({
      include: [
        {
          model: Bedrooms,
          where: {id:bedroomIds},
        }
      ],
      where: {
        start_date: {[Op.lt]: end_date}, //menor que <
        end_date: {[Op.gt]: start_date} //Mayor que >
      }
    })
    if (existReservations.length > 0) {
      return res.status(400).json({message: 'Las habitaciones seleccionadas ya estan reservadas en esas fechas'})
    }
    const newReservation = await Reservations.create({
      usuarioId: userId,
      hotelId,
      start_date,
      end_date,
      numberOfPeople,
      numberOfNights
      
    })

    res.json({message: 'Reserva Realizada con exito'})

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al realizar la reserva" });
  }
});

router.get("/reservations/:user", verifyToken, async (req, res) => {
  try {
    const { user } = req.params;
    const fechaActual = new Date(); 

    
    const userReservations = await Reservations.findAll({  
      where: { userName: user },
      include: [
        { model: Bedrooms, attributes: ["Type", "price_night"] },
        { model: Hotels, attributes: ["name", "star_rating", "average_rating", "img"] },
      ],
    });


    if (!userReservations.length) {
      return res.status(404).json({ message: "No hay reservas" });
    }

    const activeReservations = [];
    const pastReservations = [];

    userReservations.forEach((reserva) => {
      console.log("Reserva start_date:", reserva.start_date);
      if (new Date(reserva.start_date) >= fechaActual) {
        activeReservations.push(reserva);
      } else {
        pastReservations.push(reserva);
      }
    });

  
    return res.json({ activeReservations, pastReservations });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
});

console.log(Reservations); 
console.log("Se está ejecutando routes.js".yellow);

export default router;
