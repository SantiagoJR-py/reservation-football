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
exports.SessionController = void 0;
const session_service_1 = require("../service/session.service");
class SessionController {
    constructor() {
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userAgent, browser, device, os } = req.body;
            const object = {
                userAgent, browser, device, os
            };
            try {
                const sessionService = new session_service_1.SessionService();
                const session = sessionService.add(object);
                if (!session) {
                    return res.status(400).json({
                        msg: "Invalid Session"
                    });
                }
                return res.status(201).json({
                    message: "Session created successfully!",
                });
            }
            catch (error) {
                console.error('Error creating session:', error);
                return res.status(500).json({
                    message: 'An error occurred while creating the session.',
                });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionService = new session_service_1.SessionService();
                const session = yield sessionService.getAll();
                return res.status(200).json({
                    ok: true,
                    session
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: 'An error occurred while find the session.',
                });
            }
        });
    }
}
exports.SessionController = SessionController;
