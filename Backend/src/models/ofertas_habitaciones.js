import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Habitaciones } from "./habitaciones.js";

export const OfertasHabitaciones = sequelize.define("OfertaHabitacion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descuento: { type: DataTypes.FLOAT, allowNull: false },
    fecha_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_fin: { type: DataTypes.DATE, allowNull: false },
}, { freezeTableName: true });
