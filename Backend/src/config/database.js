import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('proyecto_integrador', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
})


/* TODO: 
Conexión a base de datos real, usar neon para registrar una nueva base de datos de postgresql y usar credenciales acá */