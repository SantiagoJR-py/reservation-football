"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const routerUser = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// Definimos la ruta para crear un usuario usando directamente el método del controlador
routerUser.post('/create', userController.createUser);
routerUser.post('/login', userController.login);
exports.default = routerUser;
