"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
class ImageService {
    static getUploadMiddleware() {
        return (0, multer_1.default)({
            storage: ImageService.storage,
            limits: { fileSize: ImageService.MAX_FILE_SIZE },
            fileFilter: (req, file, cb) => {
                if (ImageService.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
                    cb(null, true);
                }
                else {
                    cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes (JPEG, PNG, GIF)'));
                }
            }
        }).single('profileImage');
    }
    static getRelativeImagePath(fileName) {
        return path_1.default.join('/', ImageService.RELATIVE_UPLOAD_PATH, fileName);
    }
    static deleteImage(imageName) {
        return new Promise((resolve, reject) => {
            if (!imageName)
                return resolve();
            const imagePath = path_1.default.join(ImageService.UPLOAD_DIR, imageName);
            fs_1.default.access(imagePath, fs_1.default.constants.F_OK, (err) => {
                if (err)
                    return resolve(); // El archivo no existe
                fs_1.default.unlink(imagePath, (unlinkErr) => {
                    if (unlinkErr)
                        return reject(unlinkErr);
                    resolve();
                });
            });
        });
    }
}
exports.ImageService = ImageService;
// Ruta relativa desde el proyecto (NO desde dist)
ImageService.ROOT_DIR = path_1.default.resolve(__dirname, '../../');
ImageService.RELATIVE_UPLOAD_PATH = 'uploads/profile';
ImageService.UPLOAD_DIR = path_1.default.join(ImageService.ROOT_DIR, ImageService.RELATIVE_UPLOAD_PATH);
ImageService.MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
ImageService.ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
ImageService.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!fs_1.default.existsSync(ImageService.UPLOAD_DIR)) {
            fs_1.default.mkdirSync(ImageService.UPLOAD_DIR, { recursive: true });
        }
        cb(null, ImageService.UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const hash = crypto_1.default.randomBytes(12).toString('hex');
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${hash}${ext}`);
    }
});
