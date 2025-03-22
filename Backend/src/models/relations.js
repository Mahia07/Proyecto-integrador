import { sequelize } from "../config/database.js";
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
    Habitaciones.belongsToMany(Reservas, { through: "ReservaHabitacion", foreignKey: "habitacionId" });
    Reservas.belongsToMany(Habitaciones, { through: "ReservaHabitacion", foreignKey: "reservaId" });

    Pagos.belongsTo(Reservas, { foreignKey: "reservaId" });
    Reservas.hasOne(Pagos, { foreignKey: "reservaId" });

    Opiniones.belongsTo(Usuarios, { foreignKey: "usuarioId" });
    Usuarios.hasMany(Opiniones, { foreignKey: "usuarioId" });

    Hoteles.hasMany(Habitaciones, { foreignKey: "hotelId" });
    Habitaciones.belongsTo(Hoteles, { foreignKey: "hotelId" });

    Ubicacion.hasMany(Hoteles, { foreignKey: "ubicacionId" });
    Hoteles.belongsTo(Ubicacion, { foreignKey: "ubicacionId" });

    Habitaciones.belongsToMany(Comodidades, { through: "HabitacionComodidad", foreignKey: "habitacionId" });
    Comodidades.belongsToMany(Habitaciones, { through: "HabitacionComodidad", foreignKey: "comodidadId" });

    Hoteles.hasMany(Opiniones, { foreignKey: "hotelId" });
    Opiniones.belongsTo(Hoteles, { foreignKey: "hotelId" });

    Usuarios.hasMany(Reservas, { foreignKey: "usuarioId" });
    Reservas.belongsTo(Usuarios, { foreignKey: "usuarioId" });

    Habitaciones.hasOne(OfertasHabitaciones, { foreignKey: "habitacionId" });
    OfertasHabitaciones.belongsTo(Habitaciones, { foreignKey: "habitacionId" });
};

