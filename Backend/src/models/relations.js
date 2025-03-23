import { Usuarios } from "./usuarios.js";
import { Ubicacion } from "./ubicacion.js";
import { Hoteles } from "./hoteles.js";
import { Habitaciones } from "./habitaciones.js";
import { Comodidades } from "./comodidades.js";
import { Opiniones } from "./opiniones.js";
import { Reservas } from "./reservas.js";
import { Pagos } from "./pagos.js";
import { OfertasHabitaciones } from "./ofertas_habitaciones.js";

 export const defineRelations = () => {
    // Relacion muchos a muchos entre habitaciones y reservas
    Habitaciones.belongsToMany(Reservas, { through: "ReservaHabitacion", foreignKey: "habitacionId" });
    Reservas.belongsToMany(Habitaciones, { through: "ReservaHabitacion", foreignKey: "reservaId" });
    // Relacion 1 a 1 entre reservas y pagos 
    Pagos.belongsTo(Reservas, { foreignKey: "reservaId" });
    Reservas.hasOne(Pagos, { foreignKey: "reservaId" });
    // Relacion 1 a muchos
    Opiniones.belongsTo(Usuarios, { foreignKey: "usuarioId" });
    Usuarios.hasMany(Opiniones, { foreignKey: "usuarioId" });
    // Relaciones 1 a muchos entre hoteles y habitaciones
    Hoteles.hasMany(Habitaciones, { foreignKey: "hotelId" });
    Habitaciones.belongsTo(Hoteles, { foreignKey: "hotelId" });
    // Relacion 1 a muchos entre ubicacion y hoteles
    Ubicacion.hasMany(Hoteles, { foreignKey: "ubicacionId" });
    Hoteles.belongsTo(Ubicacion, { foreignKey: "ubicacionId" });
    //Relacion muchos a muchos entre habitaciones y comodidades
    Habitaciones.belongsToMany(Comodidades, { through: "HabitacionComodidad", foreignKey: "habitacionId" });
    Comodidades.belongsToMany(Habitaciones, { through: "HabitacionComodidad", foreignKey: "comodidadId" });
    // Relacion 1 a muchos
    Hoteles.hasMany(Opiniones, { foreignKey: "hotelId" });
    Opiniones.belongsTo(Hoteles, { foreignKey: "hotelId" });
    // Relacion 1 a muchos entre Usuarios y reservas
    Usuarios.hasMany(Reservas, { foreignKey: "usuarioId" });
    Reservas.belongsTo(Usuarios, { foreignKey: "usuarioId" });
    // Relacion 1 a 1 entre habitaciones y OfertaHabitaciones
    Habitaciones.hasOne(OfertasHabitaciones, { foreignKey: "habitacionId" });
    OfertasHabitaciones.belongsTo(Habitaciones, { foreignKey: "habitacionId" });
};

defineRelations()