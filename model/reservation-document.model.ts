import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.db";
import { Reservation } from "./reservation.model"; // Asegúrate de que la importación sea correcta

export interface ReservationDocumentInterface {
    id: number;
    reservationId: number;
    url: string;
    state: string;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletionAt: Date;
}

export default class ReservationDocument extends Model implements ReservationDocumentInterface {
    id!: number;
    reservationId!: number;
    url!: string;
    state!: string;
    createdBy!: string;
    updatedBy!: string;
    deletedBy!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletionAt!: Date;
}

ReservationDocument.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'reservations', // Nombre de la tabla de reservaciones
            key: 'id'
        }
    },
    url: {
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
    tableName: "reservation-document",
    sequelize: sequelize,
    paranoid: true,
    timestamps: true
});

export function setupReservationDocumentRelationships() {
    ReservationDocument.belongsTo(Reservation, {
        foreignKey: 'reservationId',
        as: 'Reservation'
    });
}