import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('Hotel_DB', 'postgres', 'SE.Abril23', {
    host: 'localhost',
    dialect: 'postgres'
})