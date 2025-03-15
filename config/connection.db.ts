import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Crear una instancia de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  dialect: 'mariadb',
});

// Probar la conexión con la base de datos
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Exportar la instancia de Sequelize y la función de conexión
export { sequelize, connectToDatabase };
