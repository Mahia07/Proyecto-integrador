import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Hotel_DB", "postgres", "SE.Abril23", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    charset: "utf8",
  },
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
});

async function syncSequence() {
  try {
      await sequelize.query(`
          SELECT setval('"Usuarios_id_seq"', COALESCE((SELECT MAX(id) FROM "Usuarios"), 1));
      `);
      console.log('Secuencia sincronizada correctamente.');
  } catch (error) {
      console.error('Error al sincronizar la secuencia:', error);
  }
}


export async function syncDB() {
  try {
      await sequelize.sync();
      console.log('Base de datos sincronizada correctamente.');
      await syncSequence(); 
  } catch (error) {
      console.error('Error al sincronizar la base de datos:', error);
  }
}


