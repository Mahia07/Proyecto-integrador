import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Usuarios = sequelize.define("Usuario", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING, allowNull:false },
    activo: {type: DataTypes.BOOLEAN, defaultValue:true}, 
    constraseña : {type: DataTypes.STRING, allowNull:false}

}, { freezeTableName: true });

