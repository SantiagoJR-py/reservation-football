import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export class ImageService {
  private readonly uploadDir: string;
  private readonly relativeUploadPath: string;
  private readonly storage: multer.StorageEngine;

  private static readonly ROOT_DIR = path.resolve(__dirname, '../../');
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

  constructor(relativePath: string) {
    this.relativeUploadPath = relativePath;
    this.uploadDir = path.join(ImageService.ROOT_DIR, relativePath);

    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(this.uploadDir)) {
          fs.mkdirSync(this.uploadDir, { recursive: true });
        }
        cb(null, this.uploadDir);
      },
      filename: (req, file, cb) => {
        const hash = crypto.randomBytes(12).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, `${hash}${ext}`);
      }
    });
  }

  getUploadMiddleware() {
    return multer({
      storage: this.storage,
      limits: { fileSize: ImageService.MAX_FILE_SIZE },
      fileFilter: (req, file, cb) => {
        if (ImageService.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes (JPEG, PNG, GIF)'));
        }
      }
    }).single('image');
  }

  getRelativeImagePath(fileName: string): string {
    return path.join('/', this.relativeUploadPath, fileName);
  }

  deleteImage(imageName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!imageName) return resolve();

      const imagePath = path.join(this.uploadDir, imageName);

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
