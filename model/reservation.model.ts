import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.db";
import User from "./user.model";
import Bank from "./bank.model";
import Session from "./session.model";

export class Reservation extends Model {
    public id!:number;
    public userId?:number;
    public sessionId?:number;
    public name!:number;
    public deposit!:number;
    public bankId!:number;
    public date!: Date;
    public rangeHours!:string;
    public time!: string;


    public createdBy?: string;
    public updatedBy?: string;
    public deletedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletionAt?: Date;
}

Reservation.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sessionId:{
        type: DataTypes.INTEGER,
        allowNull: true,   
    },
    name : {
        type: DataTypes.STRING(255),
        allowNull:false,
    },
    deposit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bankId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rangeHours: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: "reservations",
    sequelize: sequelize,
    paranoid: true,
    timestamps: true
})

Reservation.belongsTo(User, {
    foreignKey: 'userId',
    as: 'User'
});

Reservation.belongsTo(Session, {
    foreignKey: 'sessionId',
    as: 'Session'
});

Reservation.belongsTo(Bank, {
    foreignKey: 'bankId',
    as: 'Bank'
});