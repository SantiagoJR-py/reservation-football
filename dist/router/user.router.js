"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const routerUser = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
routerUser.post('/login', userController.login);
routerUser.post('/create', userController.createUser);
routerUser.post('/update', auth_middleware_1.tokenVerify, userController.update);
routerUser.post('/upload-image', auth_middleware_1.tokenVerify, userController.uploadImage);
routerUser.get('/getUser', auth_middleware_1.tokenVerify, userController.getUser);
routerUser.get('/getAllByUser', auth_middleware_1.tokenVerify, userController.getAllByUser);
exports.default = routerUser;
