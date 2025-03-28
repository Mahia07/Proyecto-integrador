import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const Payments = sequelize.define("Pago", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    payment_method: { type: DataTypes.STRING, allowNull: false }
},{ freezeTableName: true });

