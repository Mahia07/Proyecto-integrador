import { Usuarios } from "./usuarios.js";
import { Ubicacion } from "./ubicacion.js";
import { Hoteles } from "./hoteles.js";
import { Habitaciones } from "./habitaciones.js";
import { Comodidades } from "./comodidades.js";
import { Opiniones } from "./opiniones.js";
import { Reservas } from "./reservas.js";
import { Pagos } from "./pagos.js";
import { OfertasHabitaciones } from "./ofertas_habitaciones.js";

export  const defineRelations = () => {
    console.log("definiendo relaciones")
    Opiniones.belongsTo(Hoteles, { foreignKey: 'hotelId' });
    Opiniones.belongsTo(Usuarios, { foreignKey: 'usuarioId' });
    Hoteles.hasMany(Opiniones, { foreignKey: 'hotelId' });
    Usuarios.hasMany(Opiniones, { foreignKey: 'usuarioId' });
    // 📌 Relación muchos a muchos entre Habitaciones y Reservas
    Habitaciones.belongsToMany(Reservas, { through: "ReservaHabitacion", foreignKey: "habitacionId" });
    Reservas.belongsToMany(Habitaciones, { through: "ReservaHabitacion", foreignKey: "reservaId" });

    // 📌 Relación 1 a 1 entre Pagos y Reservas (una reserva tiene solo un pago)
    Pagos.belongsTo(Reservas, { foreignKey: "reservaId" });
    Reservas.hasOne(Pagos, { foreignKey: "reservaId" });



    // 📌 Relación 1 a muchos entre Hoteles y Habitaciones
    Hoteles.hasMany(Habitaciones, { foreignKey: "hotelId" });
    Habitaciones.belongsTo(Hoteles, { foreignKey: "hotelId" });

    // 📌 Relación 1 a muchos entre Ubicación y Hoteles
    Ubicacion.hasMany(Hoteles, { foreignKey: "ubicacionId" });
    Hoteles.belongsTo(Ubicacion, { foreignKey: "ubicacionId" });

    // 📌 Relación muchos a muchos entre Habitaciones y Comodidades
    Habitaciones.belongsToMany(Comodidades, { through: "HabitacionComodidad", foreignKey: "habitacionId" });
    Comodidades.belongsToMany(Habitaciones, { through: "HabitacionComodidad", foreignKey: "comodidadId" });



    // 📌 Relación 1 a muchos entre Usuarios y Reservas
    Usuarios.hasMany(Reservas, { foreignKey: "usuarioId" });
    Reservas.belongsTo(Usuarios, { foreignKey: "usuarioId" });

    // 📌 Relación 1 a 1 entre Habitaciones y OfertasHabitaciones
    Habitaciones.hasOne(OfertasHabitaciones, { foreignKey: "habitacionId" });
    OfertasHabitaciones.belongsTo(Habitaciones, { foreignKey: "habitacionId" });


};

defineRelations();
