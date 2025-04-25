"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const security_controller_1 = require("../controller/security.controller");
const routerSecurity = (0, express_1.Router)();
const securityController = new security_controller_1.SecurityController();
routerSecurity.get('/validateTokenVerify/:token', securityController.validateToken);
exports.default = routerSecurity;
