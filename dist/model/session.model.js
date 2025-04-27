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
        allowNull: true,
    },
    browser: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ip: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    device: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    os: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fingerPrint: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    report: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdBy: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    updatedBy: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    deletedBy: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    createdAt: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    deletionAt: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: connection_db_1.sequelize,
    modelName: 'Session',
    tableName: 'sessions',
    timestamps: true, // Agrega las columnas createdAt y updatedAt automáticamente
});
exports.default = Session;
