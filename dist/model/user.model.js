"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
const sequelize_1 = require("sequelize");
const connection_db_1 = require("../config/connection.db");
class User extends sequelize_1.Model {
}
User.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Obligatorio
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Obligatorio
        unique: true, // Debe ser único
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Obligatorio
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Opcional
    },
    identification: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Opcional
    },
    birthdate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Opcional
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Opcional
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Opcional
    },
    termsAndConditions: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true, // Opcional
    },
}, {
    sequelize: connection_db_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});
exports.default = User;
