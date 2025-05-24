"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupReservationRelationships = exports.Reservation = void 0;
const sequelize_1 = require("sequelize");
const connection_db_1 = require("../config/connection.db");
const user_model_1 = __importDefault(require("./user.model"));
const bank_model_1 = __importDefault(require("./bank.model"));
const session_model_1 = __importDefault(require("./session.model"));
const reservation_document_model_1 = __importDefault(require("./reservation-document.model"));
const sport_court_model_1 = __importDefault(require("./sport-court.model"));
const company_model_1 = __importDefault(require("./company.model"));
class Reservation extends sequelize_1.Model {
}
exports.Reservation = Reservation;
Reservation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    sessionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    discountCode: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    deposit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bankId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sportCourtId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    companyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    startTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    endTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
    tableName: "reservations",
    sequelize: connection_db_1.sequelize,
    paranoid: true,
    timestamps: true
});
function setupReservationRelationships() {
    Reservation.belongsTo(user_model_1.default, {
        foreignKey: 'userId',
        as: 'User'
    });
    Reservation.belongsTo(session_model_1.default, {
        foreignKey: 'sessionId',
        as: 'Session'
    });
    Reservation.belongsTo(bank_model_1.default, {
        foreignKey: 'bankId',
        as: 'Bank'
    });
    Reservation.belongsTo(company_model_1.default, {
        foreignKey: 'companyId',
        as: 'Company'
    });
    Reservation.belongsTo(sport_court_model_1.default, {
        foreignKey: 'sportCourtId',
        as: 'SportCourt'
    });
    Reservation.hasMany(reservation_document_model_1.default, {
        foreignKey: 'reservationId',
        as: 'Documents'
    });
}
exports.setupReservationRelationships = setupReservationRelationships;
