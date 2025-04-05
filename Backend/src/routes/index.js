import express from "express";
import cors from "cors";
import { sequelize, syncDB } from "../config/database.js";
import { defineRelations } from "../models/relations.js";
//import { InitializeData } from "../mocks/datamock.js";
//import { Users } from "../models/usuarios.js";
import router from "./routes.js";
import Adminrouter from "./adminRoutes.js";
import "colors";

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Rutas
app.use(router);
app.use("/hotels", Adminrouter);


async function main() {
  try {
    console.log("Ejecutando defineRelations()...");
    defineRelations(); 

    console.log("Sincronizando base de datos...");

    sequelize.sync({  alter: false }).then(() => {
      console.log("Base de datos sincronizada") 
    });
    

    console.log("Base de datos sincronizada correctamente".green);

    console.log("Insertando datos iniciales...");
    //await InitializeData();

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port: ${port}`.magenta);
    });

    console.log("Conexión a la base de datos exitosa".cyan);
  } catch (error) {
    console.error("Error de conexión a la base de datos:".red, error);
  }
}

main();