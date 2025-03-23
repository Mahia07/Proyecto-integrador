import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Ubicacion = sequelize.define('Ubicacion', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        defaultValue: 'Colombia'
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { freezeTableName: true });
