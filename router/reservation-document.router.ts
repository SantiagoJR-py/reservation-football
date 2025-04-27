// src/routes/userRoutes.ts
import { Router } from 'express';
import { ReservationDocumentController } from '../controller/reservation-document.controller';



const routerReservationDocument = Router();
const reservationDocumentController = new ReservationDocumentController();

routerReservationDocument.post('/:reservationId/create', reservationDocumentController.uploadImage);

export default routerReservationDocument;
