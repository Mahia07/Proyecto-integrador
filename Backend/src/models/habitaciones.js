import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const Habitaciones = sequelize.define("Habitacion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo: { type: DataTypes.STRING, allowNull: false },
    precio_noche: { type: DataTypes.FLOAT, allowNull: false }
},{ freezeTableName: true });

