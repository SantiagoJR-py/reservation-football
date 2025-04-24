// src/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { tokenVerify } from '../middleware/auth.middleware';



const routerUser = Router();
const userController = new UserController();

routerUser.post('/login', userController.login);
routerUser.post('/create', userController.createUser);
routerUser.post('/update', tokenVerify, userController.update);
routerUser.post('/upload-image', tokenVerify, userController.uploadImage);
routerUser.get('/getUser', tokenVerify, userController.getUser);
routerUser.get('/getAllByUser', tokenVerify, userController.getAllByUser);

export default routerUser;
