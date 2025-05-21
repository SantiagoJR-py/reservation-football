// models/User.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection.db';
import { Reservation } from './reservation.model';
import Company from './company.model'; // Asegúrate de que la ruta sea correcta

class User extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public role!: string;
  public email?: string;
  public identification?: string;
  public birthdate?: Date;
  public urlImage?: string;
  public address?: string;
  public termsAndConditions?: boolean;
  public companyId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  identification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  urlImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  termsAndConditions: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  sequelize: sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

// Relaciones
User.belongsTo(Company, {
  foreignKey: 'companyId',
  as: 'Company',
});

export default User;
