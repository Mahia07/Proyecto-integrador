import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Opiniones = sequelize.define("Opinion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    puntuacion: { type: DataTypes.INTEGER, allowNull: false },
    comentario: { type: DataTypes.TEXT }
}, { freezeTableName: true });

