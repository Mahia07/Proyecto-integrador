import express from 'express';
import cors from 'cors';
import { sequelize } from '../config/database.js';
import { defineRelations } from '../models/relations.js';
import { inicializarDatos } from '../mocks/mock.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Chao');
});

async function main() {
    try {
        defineRelations(); // 📌 Definir relaciones ANTES de sincronizar

        await sequelize.sync({ alter: true, force: true }); // 📌 No usar force: true en producción
        console.log("Base de datos sincronizada correctamente");

        // 📌 Si necesitas datos de prueba, descomenta esto
        // await inicializarDatos();

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });

        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
}

//TODO:
/* PASAR TODO INGLES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

main();
