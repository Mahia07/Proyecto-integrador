import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Users = sequelize.define("Usuarios", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: {type: DataTypes.STRING, allowNull:false},
    phoneNumber: { type: DataTypes.STRING, allowNull:false },
    active: {type: DataTypes.BOOLEAN, defaultValue:true}, 
    password : {type: DataTypes.STRING, allowNull:false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'cliente'}
}, { freezeTableName: true });

