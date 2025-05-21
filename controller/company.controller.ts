import { Request, Response } from 'express';
import { CompanyService } from '../service/company.service';

export class CompanyController {
  static async getAll(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;

    try {
      const service = new CompanyService(dataUser.email);
      const companies = await service.getAll();
      res.status(200).json({
        ok: true,
        data: companies
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Internal server error' });
    }
  }

  static async getById(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;
    console.log("DATA: ",dataUser);

    try {
      const service = new CompanyService(dataUser.email);
      const company = await service.findById(Number(dataUser.companyId));
      if (!company) {
        return res.status(404).json({
          ok: false,
          message: 'Company not found'
        });
      }

      res.status(200).json({
        ok: true,
        data: company
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Internal server error' });
    }
  }

  static async findByNIT(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;

    try {
      const service = new CompanyService(dataUser.email);
      const company = await service.findByNIT(req.params.nit);
      if (!company) {
        return res.status(404).json({
          ok: false,
          message: 'Company not found'
        });
      }

      res.status(200).json({
        ok: true,
        data: company
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Internal server error' });
    }
  }

  static async create(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;
    const data = req.body.data
    console.log("DATOS: ", dataUser);

    try {
      const service = new CompanyService(dataUser.email);
      const company = await service.createCompany(data);
      res.status(201).json({
        ok: true,
        data: company
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Internal server error' });
    }
  }

  static async update(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;
    const data = req.body.data;
    console.log("CUERPO: ",req.body)

    try {
      const service = new CompanyService(dataUser.email);
      const company = await service.updateCompany(Number(dataUser.companyId), data);
      res.status(200).json({
        ok: true,
        data: company
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Internal server error' });
    }
  }

  static async delete(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;

    try {
      const service = new CompanyService(dataUser.email);
      await service.delete(Number(req.params.id));
      res.status(200).json({
        ok: true,
        message: 'Company deleted successfully'
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Internal server error' });
    }
  }
}
