import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"; // Asegúrate de importar tu conexión a PostgreSQL
export const Users = sequelize.define(
  "Usuarios",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "cliente" },
  },
  {
    freezeTableName: true,
    timestamps: true, // Evita que Sequelize intente crear columnas `createdAt` y `updatedAt`
  }
);

console.log("Modelo Users definido correctamente");
