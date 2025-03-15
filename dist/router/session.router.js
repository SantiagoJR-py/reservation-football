"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const session_controller_1 = require("../controller/session.controller");
const routerSession = (0, express_1.Router)();
const sessionController = new session_controller_1.SessionController();
routerSession.post('/create', sessionController.add);
routerSession.get('/findAll', sessionController.getAll);
exports.default = routerSession;
