import express from "express";
import cors from "cors";
import { sequelize } from "../config/database.js";
import { defineRelations } from "../models/relations.js";
import { InitializeData } from "../mocks/datamock.js";
import authRoutes from "./authRotes.js";
import router from "./routes.js";
import Adminrouter from "./adminRoutes.js";
import "colors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// Rutas
app.use("/auth", authRoutes);
app.use(router);

app.use(Adminrouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.get("/", (req, res) => {
  res.send("Chao");
});

async function main() {
  try {
    defineRelations();

    console.log("Modelos registrados:", Object.keys(sequelize.models));
    await sequelize.getQueryInterface().dropTable('Usuario')
    await sequelize.sync({ alter: true, force: true });

    console.log("Base de datos sincronizada correctamente".green);

    await InitializeData();

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`.magenta);
    });

    console.log("Conexión a la base de datos exitosa".cyan);
  } catch (error) {
    console.error("Error de conexión a la base de datos:".red, error);
  }
}
main();
