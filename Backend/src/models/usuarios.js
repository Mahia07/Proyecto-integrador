import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Users = sequelize.define("Usuarios", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phoneNumber: { type: DataTypes.STRING, allowNull:false },
    active: {type: DataTypes.BOOLEAN, defaultValue:true}, 
    password : {type: DataTypes.STRING, allowNull:false}

}, { freezeTableName: true });

