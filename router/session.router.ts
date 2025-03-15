// src/routes/userRoutes.ts
import { Router } from 'express';
import { SessionController } from '../controller/session.controller';



const routerSession = Router();
const sessionController = new SessionController();

routerSession.post('/create', sessionController.add);
routerSession.get('/findAll', sessionController.getAll);

export default routerSession;
