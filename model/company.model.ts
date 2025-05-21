import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.db";
import User from "./user.model";

export interface CompanyInterface {
    id: number;
    name: string;
    code: string;
    NIT: string;
    email: string;
    phone: string;
    address: string;
    urlImage: string;
    state: string;

    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletionAt: Date;
}

export default class Company extends Model implements CompanyInterface {
    id!: number;
    name!: string;
    code!: string;
    NIT!: string;
    email!: string;
    phone!: string;
    address!: string;
    urlImage!: string;
    state!: string;

    createdBy!: string;
    updatedBy!: string;
    deletedBy!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletionAt!: Date;
}

Company.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    code: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    NIT: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    urlImage: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    createdBy: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    deletedBy: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deletionAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: "companies",
    sequelize: sequelize,
    paranoid: true,
    timestamps: true
});