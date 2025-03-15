
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection.db';

class Session extends Model {
  public id!: number;
  public userAgent!: string; // Información completa del User Agent
  public browser!: string;  // Nombre del navegador
  public device!: string;   // Tipo de dispositivo
  public os!: string;       // Sistema operativo
  public readonly createdAt!: Date; // Fecha de creación
  public readonly updatedAt!: Date; // Fecha de actualización
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false, // Obligatorio
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: false, // Obligatorio
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false, // Obligatorio
    },
    os: {
      type: DataTypes.STRING,
      allowNull: false, // Obligatorio
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Session',
    tableName: 'sessions',
    timestamps: true, // Agrega las columnas createdAt y updatedAt automáticamente
  }
);

export default Session;
