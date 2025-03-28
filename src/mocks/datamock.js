import { Sequelize } from "sequelize";
import {Users} from '../models/usuarios.js'
import { Reservations } from '../models/reservas.js'
import { Location } from '../models/ubicacion.js'
import { Hotels } from '../models/hoteles.js'
import { Bedrooms } from '../models/habitaciones.js'
import { Characteristics } from '../models/comodidades.js'
import { Opinions } from '../models/opiniones.js'
import { Payments } from '../models/pagos.js'
import {BedroomsDiscount} from '../models/ofertas_habitaciones.js'
import { sequelize } from "../config/database.js";


export const InitializeData = async () => {
    try {
        await sequelize.sync({ force: true })
    
        const Locations = await Location.bulkCreate([
            {id: 1, city: 'Cartagena', country: 'Colombia', address: 'Carrera 1 No 62-198, Crespo, 130001 Cartagena de Indias'},
            {id: 2, city: 'Medellín', country: 'Colombia', address: 'Carrera  50 A #83 29, 055411 Medellín, Colombia'}
        ]);
    
        const Hotel = await Hotels.bulkCreate([
            {id: 1, name: 'GHL Corales de Indias', star_rating: 5, average_rating: 8.7, img: '', ubicacionId: 1},
            {id: 2, name: 'Hotel Sixtina Plaza Medellin', star_rating: 5, average_rating: 8.7, img: '', ubicacionId: 2}
        ]);
    
        const Bedroom = await Bedrooms.bulkCreate([
            {id: 1, type: 'Habitación Doble', price_night: 500, hotelId: 1},
            {id: 2, type: 'Habitacion Doble', price_night: 147, hotelId: 2}
    
        ]);
    
        const user = await Users.bulkCreate([
            { id: 1, name: "Juan Pérez", email: "juan@example.com", username: 'Juan123',phoneNumber: '1234567890', active: true, password: 'JuanPerez123', role: 'Admin'},
            { id: 2, name: "María López", email: "maria@example.com", username: 'Maria',phoneNumber: '0987654321', active: true, password: 'MariaLopez09'},
            { id: 3, name: "Carlos Castañeda", email: "Carlos@example.com", username: 'Carlos56',phoneNumber: '8790754478', active: true, password: 'Carlos789'}
        ]);
    
        const opinions = await Opinions.bulkCreate([
            { id: 1, rating: 5, review: "¡Excelente!", hotelId: 1, usuarioId: 1 },
            { id: 2, rating: 4, review: "Muy bueno", hotelId: 2, usuarioId: 2 }
        ]);
    
        const reservations = await Reservations.bulkCreate([
            { id: 1, start_date: "2025-04-01", end_date: "2025-04-06", numberOfNights: 5, numberOfPeople: 2, usuarioId: 1 },
            { id: 2, start_date: "2025-05-10", end_date: "2025-05-15", numberOfNights: 5, numberOfPeople: 3, usuarioId: 2 }
        ]);
    
        await sequelize.models.ReservaHabitacion.bulkCreate([
            { habitacionId: 1, reservaId: 1 },
            { habitacionId: 2, reservaId: 2 }
        ]);
    
        const payments = await Payments.bulkCreate([
            { id: 1, amount: 2500, payment_method: "Tarjeta de crédito", reservaId: 1 },
            { id: 2, amount: 735, payment_method: "PayPal", reservaId: 2 }
        ]);
    
        const characteristic = await Characteristics.bulkCreate([
            { id: 1, name: "WiFi", description: "Conexión a internet" },
            { id: 2, name: "Desayuno incluido", description: "Incluye desayuno gratuito" }
        ]);
    
        await sequelize.models.HabitacionComodidad.bulkCreate([
            { habitacionId: 1, caracteristicaId: 1 },
            { habitacionId: 2, caracteristicaId: 2 }
        ]);
        const bedRoomDiscount = await BedroomsDiscount.bulkCreate([
            { id: 1, discount: 10, roomId: 1, start_date: "2025-04-01", end_date: "2025-04-05" },
            { id: 2, discount: 15, roomId: 2, start_date: "2025-04-10", end_date: "2025-04-15" }
        ]);
    
    } catch (error) {
       // console.log('Error al insertar en la base de datos')
    }
    
    
}
InitializeData()
