"use strict";
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
// Cargar variables del archivo .env
dotenv_1.default.config();
class Server {
    constructor() {
        this.syncDatabase = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.default.sync({ force: false });
                yield session_model_1.default.sync({ force: false });
                yield bank_model_1.default.sync({ force: false });
                yield reservation_model_1.Reservation.sync({ force: false });
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
    }
    middlewares() {
        // Sirve los archivos estáticos desde la carpeta dist/src/uploads
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
        this.app.use(express_1.default.json());
        const corsOptions = {
            origin: 'http://localhost:4200',
            optionsSuccessStatus: 200
        };
        this.app.use((0, cors_1.default)(corsOptions));
    }
}
exports.Server = Server;
