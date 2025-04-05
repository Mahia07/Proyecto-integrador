import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Characteristics = sequelize.define(
  "Caracteristicas",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  { freezeTableName: true }
);
