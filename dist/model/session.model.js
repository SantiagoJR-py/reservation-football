"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = require("../config/connection.db");
class Session extends sequelize_1.Model {
}
Session.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userAgent: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Obligatorio
    },
    browser: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Obligatorio
    },
    device: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Obligatorio
    },
    os: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Obligatorio
    },
}, {
    sequelize: connection_db_1.sequelize,
    modelName: 'Session',
    tableName: 'sessions',
    timestamps: true, // Agrega las columnas createdAt y updatedAt automáticamente
});
exports.default = Session;
