// src/routes/userRoutes.ts
import { Router } from 'express';
import { ReservationController } from '../controller/reservation.controller';
import { tokenVerify } from '../middleware/auth.middleware';



const routerReservation = Router();
const reservationController = new ReservationController();

routerReservation.post('/create', reservationController.create);
routerReservation.post('/createToken', tokenVerify, reservationController.createToken);

export default routerReservation;
