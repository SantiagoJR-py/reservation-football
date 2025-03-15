"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    constructor() {
        this.secretKey = process.env.KEY;
    }
    generateToken(payload, expiresIn = "1h") {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (error) {
            throw new Error("Invalid token");
        }
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.JwtService = JwtService;
