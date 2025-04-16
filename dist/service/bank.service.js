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
    constructor(currentUserEmail) {
        this.currentUserEmail = currentUserEmail;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const bank = yield bank_model_1.default.findAll({
                attributes: ['id', 'nit', 'name']
            });
            return bank;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bank = yield bank_model_1.default.findOne({
                where: { id },
                attributes: ['id', 'nit', 'name']
            });
            if (!bank) {
                throw new Error(`Bank with ID ${id} not found`);
            }
            this.bank = bank;
            return bank;
        });
    }
}
exports.BankService = BankService;
