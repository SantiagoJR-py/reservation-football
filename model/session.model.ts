
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection.db';

class Session extends Model {
  public id!: number;
  public userAgent!: string; // Información completa del User Agent
  public browser!: string;  // Nombre del navegador
  public ip?: string;  // Direccion Ip
  public device!: string;   // Tipo de dispositivo
  public os!: string;     // Sistema operativo
  public fingerPrint?: string;     // Huella Digital
  public report?: string;     // Huella Digital
  
  public createdBy?: string;
  public updatedBy?: string;
  public deletedBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletionAt?: Date;
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
      allowNull: true,
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    os: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fingerPrint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    report: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: new DataTypes.STRING(255),
      allowNull: true
    },
    updatedBy: {
        type: new DataTypes.STRING(255),
        allowNull: true
    },
    deletedBy: {
        type: new DataTypes.STRING(255),
        allowNull: true
    },
    createdAt: {
        type: new DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: new DataTypes.DATE,
        allowNull: true
    },
    deletionAt: {
        type: new DataTypes.DATE,
        allowNull: true
    }
  },
  {
    sequelize: sequelize,
    modelName: 'Session',
    tableName: 'sessions',
    timestamps: true, // Agrega las columnas createdAt y updatedAt automáticamente
  }
);

export default Session;
