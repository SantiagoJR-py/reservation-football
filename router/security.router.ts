// src/routes/userRoutes.ts
import { Router } from 'express';
import { SecurityController } from '../controller/security.controller';


const routerSecurity = Router();
const securityController = new SecurityController();

routerSecurity.get('/validateTokenVerify/:token', securityController.validateToken);

export default routerSecurity;