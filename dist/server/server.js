"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const session_router_1 = __importDefault(require("../router/session.router"));
const user_router_1 = __importDefault(require("../router/user.router"));
const user_model_1 = __importDefault(require("../model/user.model"));
const session_model_1 = __importDefault(require("../model/session.model"));
const bank_model_1 = __importDefault(require("../model/bank.model"));
const reservation_model_1 = require("../model/reservation.model");
const bank_router_1 = __importDefault(require("../router/bank.router"));
const security_router_1 = __importDefault(require("../router/security.router"));
const reservation_document_model_1 = __importStar(require("../model/reservation-document.model"));
const reservation_router_1 = __importDefault(require("../router/reservation.router"));
const reservation_document_router_1 = __importDefault(require("../router/reservation-document.router"));
// Cargar variables del archivo .env
dotenv_1.default.config();
class Server {
    constructor() {
        this.syncDatabase = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
                yield user_model_1.default.sync({ force: false });
                yield session_model_1.default.sync({ force: false });
                yield bank_model_1.default.sync({ force: false });
                yield reservation_model_1.Reservation.sync({ force: false });
                yield reservation_document_model_1.default.sync({ force: false });
                // 3. Reactivar FK checks
                // await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
                //-------------------- Relaciones --------------------//
                (0, reservation_model_1.setupReservationRelationships)();
                (0, reservation_document_model_1.setupReservationDocumentRelationships)();
                console.log("Tablas sincronizadas exitosamente");
            }
            catch (error) {
                console.error("Error al sincronizar las tablas:", error);
            }
        });
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT);
        this.listen();
        this.middlewares();
        this.routes();
        this.syncDatabase();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto: ' + this.port);
        });
    }
    routes() {
        this.app.use('/app/user', user_router_1.default);
        this.app.use('/app/session', session_router_1.default);
        this.app.use('/app/bank', bank_router_1.default);
        this.app.use('/app/security', security_router_1.default);
        this.app.use('/app/reservation', reservation_router_1.default);
        this.app.use('/app/reservationDocument', reservation_document_router_1.default);
    }
    middlewares() {
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '../../uploads')));
        this.app.use(express_1.default.json());
        const corsOptions = {
            origin: 'http://localhost:4200',
            optionsSuccessStatus: 200
        };
        this.app.use((0, cors_1.default)(corsOptions));
    }
}
exports.Server = Server;
