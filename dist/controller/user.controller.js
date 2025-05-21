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
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const upload_image_1 = require("../config/upload-image");
class UserController {
    constructor() { }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = req.headers.dataUser;
            const user = {
                id: dataUser.id,
                name: dataUser.name,
                role: dataUser.role,
            };
            res.status(201).json({
                ok: true,
                user,
            });
        });
    }
    getAllByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = req.headers.dataUser;
            const userId = dataUser.id;
            const userService = new user_service_1.UserService();
            try {
                const user = yield userService.getAllById(userId);
                res.status(201).json({
                    ok: true,
                    user,
                });
            }
            catch (error) {
                console.error("ERROR FIND USER: ", error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = req.headers.dataUser;
            const userId = dataUser.id;
            const userUpdate = req.body.user;
            const userService = new user_service_1.UserService();
            try {
                yield userService.getById(userId);
                const user = yield userService.updateUser(userUpdate.name, userUpdate.username, userUpdate.email, userUpdate.identification, userUpdate.address, userUpdate.birthdate);
                res.status(201).json({
                    ok: true,
                });
            }
            catch (error) {
                console.error("ERROR FIND USER: ", error);
            }
        });
    }
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = req.headers.dataUser;
            const userId = dataUser.id;
            const userService = new user_service_1.UserService();
            // Aquí defines tú mismo la carpeta relativa
            const imageService = new upload_image_1.ImageService('uploads/profile');
            try {
                imageService.getUploadMiddleware()(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.error("Error Upload Image:", err);
                        return res.status(400).json({ success: false, message: err.message });
                    }
                    const file = req.file;
                    const oldImage = req.body.oldImage;
                    if (file) {
                        if (oldImage) {
                            yield imageService.deleteImage(oldImage).catch(console.error);
                        }
                        const relativeUrl = imageService.getRelativeImagePath(file.filename);
                        yield userService.getById(userId);
                        yield userService.updateImage(relativeUrl);
                        return res.status(200).json({
                            success: true,
                            message: "Imagen actualizada",
                            urlImage: relativeUrl, // Ej: /uploads/profile/abc123.jpg
                        });
                    }
                    else {
                        return res.status(400).json({ success: false, message: "No se recibió la imagen" });
                    }
                }));
            }
            catch (error) {
                console.error("ERROR UPDATE IMAGE: ", error);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, username, password, email } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = { name: fullName, username, password: hashedPassword, email, role: 'USER' };
            try {
                const userServices = new user_service_1.UserService();
                yield userServices.createUser(user);
                res.status(201).json({
                    message: "User created successfully!",
                });
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({
                    message: "An error occurred while creating the user. Please try again later.",
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            try {
                if (!email) {
                    throw new Error("El email es requerido");
                }
                if (!password) {
                    throw new Error("La contraseña es requerida");
                }
                const userService = new user_service_1.UserService();
                const user = yield userService.loginUser(email, password);
                return res.status(200).json({
                    token: user.token,
                    user: user.user
                });
            }
            catch (error) {
                return res.status(500).json({
                    msg: "Something went wrong during login",
                    error,
                });
            }
        });
    }
}
exports.UserController = UserController;
