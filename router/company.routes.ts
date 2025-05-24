import { Router } from 'express';
import { CompanyController } from '../controller/company.controller';
import { tokenVerify } from '../middleware/auth.middleware';

const routerCompany = Router();

routerCompany.get('/getAll', tokenVerify, CompanyController.getAll);
routerCompany.get('/getById', tokenVerify, CompanyController.getById);
routerCompany.get('/findByNit/:nit', tokenVerify, CompanyController.findByNIT);
routerCompany.post('/create', tokenVerify, CompanyController.create);
routerCompany.post('/update', tokenVerify, CompanyController.update);
routerCompany.post('/delete/:id', tokenVerify, CompanyController.delete);
routerCompany.post('/findByCode', CompanyController.findByCode);

export default routerCompany;
