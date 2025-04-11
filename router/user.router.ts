// src/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controller/user.controller';



const routerUser = Router();
const userController = new UserController();

routerUser.post('/create', userController.createUser);
routerUser.post('/login', userController.login);

export default routerUser;
