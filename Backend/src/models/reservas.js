import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const Reservas = sequelize.define("Reserva", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_fin: { type: DataTypes.DATE, allowNull: false }
}, { freezeTableName: true });


/* todo:
Revisión de reserva activa o no */