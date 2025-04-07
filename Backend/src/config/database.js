import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgresql://hotel_db_31uy_user:hpE3VeI0jimrT3EnNn2IVLxqLWxmMuzW@dpg-cvp7igs9c44c73bv04a0-a.oregon-postgres.render.com/hotel_db_31uy', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
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

export { sequelize };
