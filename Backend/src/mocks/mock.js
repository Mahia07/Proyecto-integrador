import { sequelize } from "../config/database.js";
import { Usuarios } from "../models/usuarios.js";
import { Ubicacion } from "../models/ubicacion.js";
import { Hoteles } from "../models/hoteles.js";
import { Habitaciones } from "../models/habitaciones.js";
import { Comodidades } from "../models/comodidades.js";
import { Opiniones } from "../models/opiniones.js";
import { Reservas } from "../models/reservas.js";
import { Pagos } from "../models/pagos.js";
import { OfertasHabitaciones } from "../models/ofertas_habitaciones.js";

export const inicializarDatos = async () => {
    try {
        // 🔥 Borrar y recrear la base de datos
        await sequelize.sync({ force: true });
        

        // 📌 Insertar ubicaciones
        const ubicaciones = await Ubicacion.bulkCreate([
            { id: 1, pais: "País X", nombre: "Ubicación 1", departamento: "Departamento A" },
            { id: 2, pais: "País Y", nombre: "Ubicación 2", departamento: "Departamento B" }
        ]);

        // 📌 Insertar hoteles
        const hoteles = await Hoteles.bulkCreate([
            { id: 1, nombre: "Hotel Paradise", estrellas: 5, calificacion_promedio: 4.8, ubicacionId: 1 },
            { id: 2, nombre: "Hotel Playa Azul", estrellas: 4, calificacion_promedio: 4.5, ubicacionId: 2 }
        ]);

        // 📌 Insertar habitaciones
        const habitaciones = await Habitaciones.bulkCreate([
            { id: 1, tipo: "Suite", precio_noche: 200, hotelId: 1 },
            { id: 2, tipo: "Doble", precio_noche: 150, hotelId: 1 },
            { id: 3, tipo: "Individual", precio_noche: 100, hotelId: 2 }
        ]);

        // 📌 Insertar usuarios
        const usuarios = await Usuarios.bulkCreate([
            { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
            { id: 2, nombre: "María López", email: "maria@example.com" }
        ]);

        // 📌 Insertar opiniones
        const opiniones = await Opiniones.bulkCreate([
            { id: 1, puntuacion: 5, comentario: "¡Excelente!", hotelId: 1, usuarioId: 1 },
            { id: 2, puntuacion: 4, comentario: "Muy bueno", hotelId: 2, usuarioId: 2 }
        ]);

        // 📌 Insertar reservas
        const reservas = await Reservas.bulkCreate([
            { id: 1, fecha_inicio: "2025-04-01", fecha_fin: "2025-04-05", usuarioId: 1 },
            { id: 2, fecha_inicio: "2025-04-10", fecha_fin: "2025-04-15", usuarioId: 2 }
        ]);

        // 📌 Relacionar habitaciones con reservas
        await sequelize.models.ReservaHabitacion.bulkCreate([
            { habitacionId: 1, reservaId: 1 },
            { habitacionId: 2, reservaId: 2 }
        ]);

        // 📌 Insertar pagos
        const pagos = await Pagos.bulkCreate([
            { id: 1, monto: 500, reservaId: 1, metodo_pago: "Tarjeta de crédito" },
            { id: 2, monto: 750, reservaId: 2, metodo_pago: "Tarjeta de crédito" }
        ]);

        // 📌 Insertar comodidades
        const comodidades = await Comodidades.bulkCreate([
            { id: 1, nombre: "WiFi", description: "Conexión a internet" },
            { id: 2, nombre: "Desayuno incluido", description: "Conexión a internet" }
        ]);

        // 📌 Relacionar habitaciones con comodidades
        await sequelize.models.HabitacionComodidad.bulkCreate([
            { habitacionId: 1, comodidadId: 1 },
            { habitacionId: 2, comodidadId: 2 }
        ]);

        // 📌 Insertar ofertas en habitaciones
        const ofertasHabitaciones = await OfertasHabitaciones.bulkCreate([
            { id: 1, descuento: 10, habitacionId: 1, fecha_inicio: "2025-04-01", fecha_fin: "2025-04-05" },
            { id: 2, descuento: 15, habitacionId: 2, fecha_inicio: "2025-04-10", fecha_fin: "2025-04-15" }
        ]);

        
    } catch (error) {
        console.error("Error al poblar la base de datos:", error);
    }
};

// 🚀 Ejecutar la función para poblar los datos
inicializarDatos();
