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
exports.SessionService = void 0;
const session_model_1 = __importDefault(require("../model/session.model"));
class SessionService {
    constructor() { }
    add(session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield session_model_1.default.create(session);
                return newUser;
            }
            catch (error) {
                console.error('Error creating session:', error);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessions = yield session_model_1.default.findAll({
                    order: [['createdAt', 'DESC']],
                });
                return sessions;
            }
            catch (error) {
                console.error('Error find session:', error);
            }
        });
    }
}
exports.SessionService = SessionService;
