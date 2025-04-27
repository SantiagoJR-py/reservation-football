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
exports.BankService = void 0;
const bank_model_1 = __importDefault(require("../model/bank.model"));
class BankService {
    constructor(currentUserName) {
        this.currentUserEmail = currentUserName;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const bank = yield bank_model_1.default.findAll({
                attributes: ['id', 'accountNumber', 'name', 'state']
            });
            return bank;
        });
    }
    addBank(bank) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBank = yield bank_model_1.default.create(bank);
                return newBank;
            }
            catch (error) {
                console.error("Error create bank", error);
            }
        });
    }
    editBank(accountNumber, name, state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.bank) {
                throw new Error('Not Found Bank');
            }
            this.bank.accountNumber = accountNumber;
            this.bank.name = name;
            this.bank.state = state;
            yield this.bank.save();
            return this.bank;
        });
    }
    deleteBank(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield bank_model_1.default.destroy({
                    where: { id: id }
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getById(bankId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bank = yield bank_model_1.default.findOne({
                where: { id: bankId },
                attributes: ['id', 'nit', 'name', 'state']
            });
            if (!bank) {
                throw new Error(`Bank with ID ${bankId} not found`);
            }
            this.bank = bank;
            return bank;
        });
    }
}
exports.BankService = BankService;
