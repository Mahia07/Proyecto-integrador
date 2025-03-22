import { Opiniones } from "../models/opiniones.js";
import { Hoteles } from "../models/hoteles.js";
import { Usuarios } from "../models/usuarios.js";
import { defineRelations } from "../models/relations.js";


async function getOpinionesPorHotel(hotelId) {
    try {
        const opiniones = await Opiniones.findAll({
            where: { hotelId: hotelId },  // Filtramos por el ID del hotel
            include: [
                {
                    model: Hoteles,
                    attributes: ['nombre'],  // Seleccionamos solo el nombre del hotel
                },
                {
                    model: Usuarios,
                    attributes: ['nombre'],  // Seleccionamos solo el nombre del usuario
                }
            ],
            attributes: ['puntuacion', 'comentario'],  // Seleccionamos puntuación y comentario
        });

        // Mapeamos los resultados para que tengan un formato similar al de la consulta SQL
        const resultados = opiniones.map(opinion => ({
            hotel_nombre: opinion.Hotel.nombre,
            puntuacion: opinion.puntuacion,
            comentario: opinion.comentario,
            usuario_nombre: opinion.Usuario.nombre,
        }));

        return resultados;
    } catch (error) {
        console.error('Error al obtener las opiniones:', error);
        throw error;
    }
}

// 📌 Llamar la función con un ID de hotel de prueba
getOpinionesPorHotel(1);
