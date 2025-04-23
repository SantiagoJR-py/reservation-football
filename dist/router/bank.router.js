"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const bank_controller_1 = require("../controller/bank.controller");
const routerBank = (0, express_1.Router)();
const bankController = new bank_controller_1.BankController();
routerBank.post('/create', auth_middleware_1.tokenVerify, bankController.addBank);
routerBank.post('/:bankId/edit', auth_middleware_1.tokenVerify, bankController.editBank);
routerBank.delete('/:bankId/delete', auth_middleware_1.tokenVerify, bankController.deleteBank);
routerBank.get('/getAll', auth_middleware_1.tokenVerify, bankController.getAll);
routerBank.get('/:id/findOne', auth_middleware_1.tokenVerify, bankController.getById);
exports.default = routerBank;
