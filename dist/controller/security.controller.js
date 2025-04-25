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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityController = void 0;
const jwt_service_1 = require("../service/jwt.service");
class SecurityController {
    constructor() { }
    validateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.params.token;
            const JWTService = new jwt_service_1.JwtService();
            try {
                const validateToken = JWTService.verifyToken(token);
                return res.status(200).json({
                    validateToken
                });
            }
            catch (error) {
                console.error("ERROR: ", error);
                return res.status(401).json({
                    msg: 'Denied'
                });
            }
        });
    }
}
exports.SecurityController = SecurityController;
