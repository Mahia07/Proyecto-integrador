import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Reservations = sequelize.define(
  "Reserva",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    numberOfNights: { type: DataTypes.INTEGER, allowNull: false },
    numberOfPeople: { type: DataTypes.INTEGER, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    canceled : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  },
  { freezeTableName: true,
    timestamps: true
   }
);
