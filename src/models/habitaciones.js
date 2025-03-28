import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const Bedrooms = sequelize.define("Habitacion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
    price_night: { type: DataTypes.FLOAT, allowNull: false },
    available: {type: DataTypes.BOOLEAN, defaultValue: true}
},{ freezeTableName: true });

