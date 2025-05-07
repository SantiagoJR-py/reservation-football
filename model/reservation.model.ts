import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.db";
import User from "./user.model";
import Bank from "./bank.model";
import Session from "./session.model";
import ReservationDocument from "./reservation-document.model";

export class Reservation extends Model {
    public id!:number;
    public userId?:number;
    public sessionId?:number;
    public name!:string;
    public email!:string;
    public phone!:string;
    public code!:string;
    public deposit!:number;
    public bankId!:number;
    public date!: Date;
    public state!:string;
    public startTime!:string;
    public endTime!:string;
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
    email : {
        type: DataTypes.STRING(255),
        allowNull:false,
    },
    phone : {
        type: DataTypes.STRING(255),
        allowNull:false,
    },
    code : {
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
        type: DataTypes.DATE,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endTime: {
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

export function setupReservationRelationships() {
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

    Reservation.hasMany(ReservationDocument, {
        foreignKey: 'reservationId',
        as: 'Documents'
    });
}