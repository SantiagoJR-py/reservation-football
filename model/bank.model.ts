import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.db";

export interface BankInteface {
            
            id: number;
            accountNumber: string;
            name: string;
            state: string;

            createdBy: string;
            updatedBy: string;
            deletedBy: string;
            createdAt: Date;
            updatedAt: Date;
            deletionAt: Date;
    }

export default class Bank extends Model implements BankInteface {
    id!: number;
    accountNumber!: string;
    name!: string;
    state!: string;

    createdBy!: string;
    updatedBy!: string;
    deletedBy!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletionAt!: Date;
}

Bank.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    accountNumber: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    state: {
        type: new DataTypes.STRING(255),
        allowNull: true
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
}, {
    tableName: "banks",
    sequelize: sequelize,
    paranoid: true,
    timestamps: true
});
