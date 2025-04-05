import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const BedroomsDiscount = sequelize.define(
  "OfertaHabitacion",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    discount: { type: DataTypes.FLOAT, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
  },
  { freezeTableName: true }
);
