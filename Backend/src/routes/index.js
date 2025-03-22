import express from 'express';
import cors from 'cors';
import { sequelize } from '../config/database.js';
import { Usuarios } from "../models/usuarios.js";
import { Ubicacion } from "../models/ubicacion.js";
import { Hoteles } from "../models/hoteles.js";
import { Habitaciones } from "../models/habitaciones.js";
import { Comodidades } from "../models/comodidades.js";
import { Opiniones } from "../models/opiniones.js";
import { Reservas } from "../models/reservas.js";
import { Pagos } from "../models/pagos.js";
import { OfertasHabitaciones } from "../models/ofertas_habitaciones.js";
import { defineRelations } from '../models/relations.js';

defineRelations()

export { 
    Usuarios, Ubicacion, Hoteles, Habitaciones, 
    Comodidades, Opiniones, Reservas, Pagos, OfertasHabitaciones 
};




const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Chao');
});

async function main() {
    try {
        await sequelize.sync();
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
        console.log('Conexión exitosa');
    } catch (error) {
        console.log(error, 'Error de conexión a la base de datos');
    }
}

main();
