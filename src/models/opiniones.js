import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Opinions = sequelize.define("Opinion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    review: { type: DataTypes.TEXT }
}, { freezeTableName: true });
