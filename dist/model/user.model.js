"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
const sequelize_1 = require("sequelize");
const connection_db_1 = require("../config/connection.db");
const company_model_1 = __importDefault(require("./company.model")); // Asegúrate de que la ruta sea correcta
class User extends sequelize_1.Model {
}
User.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    identification: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    birthdate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    urlImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    termsAndConditions: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'companies',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}, {
    sequelize: connection_db_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});
// Relaciones
User.belongsTo(company_model_1.default, {
    foreignKey: 'companyId',
    as: 'Company',
});
exports.default = User;
