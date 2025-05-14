import { Router } from 'express';
import { tokenVerify } from '../middleware/auth.middleware';
import { SportCourtController } from '../controller/sport-court.controller';

const routerSportCourt = Router();
const sportCourtController = new SportCourtController();

// Rutas públicas
routerSportCourt.get('/', sportCourtController.getAll);

routerSportCourt.post('/create', tokenVerify, sportCourtController.addSportCourt);
routerSportCourt.put('/:sportCourtId/edit', tokenVerify, sportCourtController.editSportCourt);
routerSportCourt.delete('/:sportCourtId/delete', tokenVerify, sportCourtController.deleteSportCourt);
routerSportCourt.get('/:sportCourtId/getById', tokenVerify, sportCourtController.getById);

export default routerSportCourt;