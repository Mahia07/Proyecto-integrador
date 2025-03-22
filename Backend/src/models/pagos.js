import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const Pagos = sequelize.define("Pago", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    monto: { type: DataTypes.FLOAT, allowNull: false },
    metodo_pago: { type: DataTypes.STRING, allowNull: false }
},{ freezeTableName: true });

