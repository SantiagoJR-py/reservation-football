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
exports.BankController = void 0;
const bank_service_1 = require("../service/bank.service");
class BankController {
    constructor() { }
    addBank(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = req.headers.dataUser;
            const newBank = Object.assign(Object.assign({}, req.body.bank), { createdBy: dataUser.name });
            if (!req.body.bank) {
                throw new Error('Not send params');
            }
            const bankService = new bank_service_1.BankService(dataUser.name);
            try {
                const bank = bankService.addBank(newBank);
                if (!bank) {
                    return res.status(400).json({
                        msg: "Invalid Bank"
                    });
                }
                return res.status(200).json({
                    msg: 'Create successfull'
                });
            }
            catch (error) {
                console.error('Error creating bank:', error);
                return res.status(500).json({
                    message: 'An error occurred while creating the bank.',
                });
            }
        });
    }
    editBank(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = req.headers.dataUser;
            const bankId = Number(req.params.bankId);
            const newBank = req.body.bank;
            if (!req.body.bank) {
                throw new Error('Not send params');
            }
            const bankService = new bank_service_1.BankService(dataUser.name);
            try {
                yield bankService.getById(bankId);
                const bank = bankService.editBank(newBank.nit, newBank.name, newBank.state);
                if (!bank) {
                    return res.status(400).json({
                        msg: "Invalid Bank"
                    });
                }
                return res.status(200).json({
                    msg: 'Edit successfull'
                });
            }
            catch (error) {
                console.error('Error creating bank:', error);
                return res.status(500).json({
                    message: 'An error occurred while creating the bank.',
                });
            }
        });
    }
    deleteBank(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bankId = Number(req.params.bankId);
            const bankService = new bank_service_1.BankService('System');
            if (!bankId) {
                throw new Error('Not send params');
            }
            try {
                yield bankService.deleteBank(bankId);
                res.status(200).json({
                    ok: true,
                    msg: `Bank Id ${bankId} Deleted`
                });
            }
            catch (error) {
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bankService = new bank_service_1.BankService('System');
            try {
                const bank = yield bankService.getAll();
                return res.status(200).json({
                    ok: true,
                    bank
                });
            }
            catch (error) {
                console.error('Error find banks:', error);
                return res.status(500).json({
                    message: 'An error occurred while find the banks.',
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bankId = Number(req.params.id);
            const bankService = new bank_service_1.BankService('System');
            try {
                const bank = yield bankService.getById(bankId);
                return res.status(200).json({
                    ok: true,
                    bank
                });
            }
            catch (error) {
                console.error('Error find banks:', error);
                return res.status(500).json({
                    message: 'An error occurred while find the banks.',
                });
            }
        });
    }
}
exports.BankController = BankController;
