import { Request, Response } from "express";
import { ImageService } from "../config/upload-image";
import { ReservationDocumentService } from "../service/reservation-document.servcie";

export class ReservationDocumentController {

    constructor() { }

      async uploadImage(req: Request, res: Response) {
        const reservationId = Number(req.params.reservationId);
        const reservationDocumentService = new ReservationDocumentService('System');
      
        const imageService = new ImageService('uploads/payment-receipts'); 
      
        try {
          imageService.getUploadMiddleware()(req, res, async (err) => {
            if (err) {
              console.error("Error Upload Image:", err);
              return res.status(400).json({ success: false, message: err.message });
            }
      
            const file = req.file;
            const oldImage = req.body.oldImage;
      
            if (file) {
              if (oldImage) {
                await imageService.deleteImage(oldImage).catch(console.error);
              }
      
              const relativeUrl = imageService.getRelativeImagePath(file.filename);
              const data = { reservationId, url: relativeUrl, state: 'PENDING' };
              const reservationDocument = await reservationDocumentService.add(data);
      
              return res.status(200).json({
                success: true,
                message: "Imagen actualizada",
                reservationDocument,
              });
            } else {
              return res.status(400).json({ success: false, message: "No se recibió la imagen" });
            }
          });
        } catch (error) {
          console.error("ERROR UPDATE IMAGE: ", error);
        }
      }
}