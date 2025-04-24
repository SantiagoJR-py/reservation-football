import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export class ImageService {
  // Ruta relativa desde el proyecto (NO desde dist)
  private static readonly ROOT_DIR = path.resolve(__dirname, '../../'); 
  private static readonly RELATIVE_UPLOAD_PATH = 'uploads/profile';
  private static readonly UPLOAD_DIR = path.join(ImageService.ROOT_DIR, ImageService.RELATIVE_UPLOAD_PATH);

  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

  private static storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(ImageService.UPLOAD_DIR)) {
        fs.mkdirSync(ImageService.UPLOAD_DIR, { recursive: true });
      }
      cb(null, ImageService.UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(12).toString('hex');
      const ext = path.extname(file.originalname);
      cb(null, `${hash}${ext}`);
    }
  });

  static getUploadMiddleware() {
    return multer({ 
      storage: ImageService.storage,
      limits: { fileSize: ImageService.MAX_FILE_SIZE },
      fileFilter: (req, file, cb) => {
        if (ImageService.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes (JPEG, PNG, GIF)'));
        }
      }
    }).single('profileImage');
  }

  static getRelativeImagePath(fileName: string): string {
    return path.join('/', ImageService.RELATIVE_UPLOAD_PATH, fileName); // Devuelve algo como "/uploads/profile/archivo.jpg"
  }

  static deleteImage(imageName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!imageName) return resolve();

      const imagePath = path.join(ImageService.UPLOAD_DIR, imageName);
      
      fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) return resolve(); // El archivo no existe
        
        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) return reject(unlinkErr);
          resolve();
        });
      });
    });
  }
}
