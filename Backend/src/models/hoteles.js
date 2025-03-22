import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Ubicacion } from "./ubicacion.js";

export const Hoteles = sequelize.define("Hotel", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    estrellas: { type: DataTypes.INTEGER, allowNull: false },
    calificacion_promedio: { type: DataTypes.FLOAT, defaultValue: 0 },
    },{ freezeTableName: true });
