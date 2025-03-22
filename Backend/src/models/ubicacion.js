import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Ubicacion = sequelize.define('Ubicacion', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
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
    }
}, { freezeTableName: true });



/*TODO:
Cambiar nombre a ciudad y agregar campo de dirección */