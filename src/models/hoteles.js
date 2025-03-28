import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Hotels = sequelize.define(
  "Hotel",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    star_rating: { type: DataTypes.INTEGER, allowNull: false },
    average_rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
  },
  { freezeTableName: true }
);
