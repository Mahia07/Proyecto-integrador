import express from "express";
import cors from "cors";
import { sequelize, syncDB } from "../config/database.js";
import { defineRelations } from "../models/relations.js";
import { InitializeData } from "../mocks/datamock.js";
//import { Users } from "../models/usuarios.js";
import router from "./routes.js";
import Adminrouter from "./adminRoutes.js";



const app = express();
const port = 3001;
app.use(cors({
  origin: ['https://proyecto-integrador-1-62p7.onrender.com', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.options('*', cors({
  origin: [
    'https://proyecto-integrador-1-62p7.onrender.com',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true
}));



app.use(express.json());


app.use(router);
app.use("/hotels", Adminrouter);

async function main() {
  try {
    console.log("Ejecutando defineRelations()...");
    defineRelations(); 

    console.log("Sincronizando base de datos...");

/*sequelize.sync({  force: true }).then(() => {
      console.log("Base de datos sincronizada"); 
    });*/

    console.log("Base de datos sincronizada correctamente");

    console.log("Insertando datos iniciales...");
    await InitializeData();

  
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
  }
}

main();
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});