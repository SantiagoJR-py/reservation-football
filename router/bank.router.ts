// src/routes/userRoutes.ts
import { Router } from 'express';
import { tokenVerify } from '../middleware/auth.middleware';
import { BankController } from '../controller/bank.controller';



const routerBank = Router();
const bankController = new BankController();

routerBank.post('/create', tokenVerify, bankController.addBank);
routerBank.post('/:bankId/edit', tokenVerify, bankController.editBank);
routerBank.delete('/:bankId/delete', tokenVerify, bankController.deleteBank);
routerBank.get('/getAll', tokenVerify, bankController.getAll);
routerBank.get('/:id/findOne', tokenVerify, bankController.getById);

export default routerBank;
