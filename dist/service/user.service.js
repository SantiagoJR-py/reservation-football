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
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const jwt_service_1 = require("./jwt.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() {
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_model_1.default.create(userData);
                return newUser;
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw new Error('Unable to create user');
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({
                    where: { email },
                    attributes: ['id', 'username', 'email', 'name', 'password', 'role', 'companyId']
                });
                return user === null || user === void 0 ? void 0 : user.get({ plain: true });
            }
            catch (error) {
                console.error('Error username:', error);
                throw new Error('Not Found User.');
            }
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                where: {
                    id: userId
                }
            });
            if (!user) {
                throw new Error('User Not Found');
            }
            this.user = user;
        });
    }
    updateImage(urlImage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                throw new Error('User Not Found');
            }
            this.user.urlImage = urlImage;
            this.user.save();
        });
    }
    updateUser(name, username, email, identification, address, birthdate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                throw new Error('User Not Found');
            }
            try {
                this.user.name = name;
                this.user.username = username;
                this.user.email = email;
                this.user.identification = identification;
                this.user.address = address;
                this.user.birthdate = birthdate;
                this.user.save();
            }
            catch (error) {
                console.error("ERROR UPDATE: ", error);
            }
        });
    }
    getAllById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                where: {
                    id: userId
                },
                attributes: ['id', 'name', 'username', 'email', 'role', 'identification', 'address', 'birthdate', 'urlImage', 'createdAt']
            });
            if (!user) {
                throw new Error('User Not Found');
            }
            return user.get({ plain: true });
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByEmail(email);
            const jwtService = new jwt_service_1.JwtService();
            if (!user) {
                throw new Error('User Not Found');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Password Invalid');
            }
            delete user.password;
            const token = jwtService.generateToken({ id: user.id, name: user.name, email: user.email, role: user.role, companyId: user.companyId });
            return { token, user };
        });
    }
}
exports.UserService = UserService;
