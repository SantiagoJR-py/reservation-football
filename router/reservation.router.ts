// src/routes/userRoutes.ts
import { Router } from 'express';
import { ReservationController } from '../controller/reservation.controller';
import { tokenVerify } from '../middleware/auth.middleware';



const routerReservation = Router();
const reservationController = new ReservationController();

routerReservation.post('/create/:code', reservationController.create);
routerReservation.post('/findByCode', reservationController.findByCode)
routerReservation.post('/getAll', tokenVerify, reservationController.getAll)
routerReservation.post('/createToken/:code', tokenVerify, reservationController.createToken);

export default routerReservation;
