"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = require("../config/connection.db");
class Bank extends sequelize_1.Model {
}
exports.default = Bank;
Bank.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nit: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    state: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: true
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
    tableName: "banks",
    sequelize: connection_db_1.sequelize,
    paranoid: true,
    timestamps: true
});
