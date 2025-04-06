import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { Hotels } from "../models/hoteles.js";
import { Location } from "../models/ubicacion.js";
import { Bedrooms } from "../models/habitaciones.js";
import { Characteristics } from "../models/comodidades.js";
import { Opinions } from "../models/opiniones.js";
import { Reservations } from "../models/reservas.js";
import { sequelize } from "../config/database.js";
import { Op } from "sequelize";
//import dotenv from 'dotenv';
import "colors";
import { Sequelize } from "sequelize";
//Provicional

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Users } from "../models/usuarios.js";

//dotenv.config();
const JWT_SECRET = "mi_secreto_temporal";

const router = express.Router();

router.get("/hoteles", async (req, res) => {
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
router.get("/busqueda/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;

    // Normalizar el nombre antes de la búsqueda
    const normalizedNombre = nombre.trim().toLowerCase();

    const hotel = await Hotels.findOne({
      where: { name: normalizedNombre },
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    res.json([hotel]);
  } catch (error) {
    console.error("Error al buscar hotel:", error);
    res.status(500).json({ message: "Error al buscar hotel" });
  }
});

router.post("/reservation", verifyToken, async (req, res) => {
  console.log("Datos del usuario autenticado en reserva:", req.user);

  try {
    const {
      bedroomType,
      start_date,
      end_date,
      numberOfNights,
      numberOfPeople,
      hotelName,
    } = req.body;

    const userId = req.user.id;
    const username = req.user.username;

    if (!hotelName) {
      return res
        .status(400)
        .json({ message: "El nombre del hotel es obligatorio" });
    }

    const hotel = await Hotels.findOne({ where: { name: hotelName } });
    if (!hotel) {
      return res.status(404).json({ message: "El hotel no fue encontrado" });
    }

    const hotelId = hotel.id;

    if (!bedroomType || bedroomType.length === 0) {
      return res
        .status(400)
        .json({ message: "Escoger al menos una habitación" });
    }

    const existReservations = await Reservations.findAll({
      include: [
        {
          model: Bedrooms,
          where: { id: bedroomType },
        },
      ],
      where: {
        start_date: { [Op.lt]: end_date },
        end_date: { [Op.gt]: start_date },
      },
    });

    if (existReservations.length > 0) {
      return res.status(400).json({
        message:
          "Las habitaciones seleccionadas ya están reservadas en esas fechas",
      });
    }

    const newReservation = await Reservations.create({
      usuarioId: userId,
      username,
      hotelId,
      start_date,
      end_date,
      numberOfPeople,
      numberOfNights,
    });

    res.json({ message: "Reserva realizada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al realizar la reserva" });
  }
});

router.get("/reservaciones/:user", verifyToken, async (req, res) => {
  try {
    const { user } = req.params;
    const fechaActual = new Date();

    const userReservations = await Reservations.findAll({
      where: { username: user },
      include: [
        { model: Bedrooms, attributes: ["type", "price_night"] },
        {
          model: Hotels,
          attributes: ["name", "star_rating", "average_rating", "img"],
        },
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

// AUTHROUTES
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    username,
    phoneNumber,
    password,
    role = "Cliente",
  } = req.body;
  console.log("Datos recibidos:", req.body);

  try {
    const existingUser = await Users.findOne({ where: { username } });

    if (existingUser) {
      console.log("El usuario ya existe");
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    await Users.create({
      name,
      email,
      username,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    console.log("Usuario registrado exitosamente:", username);

    res.status(200).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    console.log("Rol del usuario:", user.role);
    console.log("Usuario encontrado:", user.username);
    console.log("Contraseña almacenada en BD:", user.password);
    console.log("Contraseña ingresada:", password);

    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Resultado de bcrypt.compare:", validPassword);

    if (!validPassword) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
console.log("Se está ejecutando routes.js".yellow);
router.get("/routesProtected", verifyToken, async (req, res) => {
  res.json({ message: "Accediste a ruta protegida" });
  console.log("Ruta protegida");
});

router.get("/Bedrooms", async (req, res) => {
  try {
    const habitaciones = await Bedrooms.findAll();
    res.json(habitaciones);
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/reservations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservations.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    reservation.active = false;
    await reservation.save();

    res.status(200).json({ message: "Reserva cancelada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
