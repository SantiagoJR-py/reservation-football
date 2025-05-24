import { Request, Response } from "express";
import { ReservationService } from "../service/reservation.service";
import { SessionService } from "../service/session.service";
import { CompanyService } from "../service/company.service";

export class ReservationController {
  constructor() {}

  async create(req: Request, res: Response) {
    const code = req.params.code as string

    const name = req.body.name;
    const discountCode = req.body.discountCode;
    const phone = req.body.phone;
    const bankId = Number(req.body.bankId);
    const sportCourtId = Number(req.body.typeCourt);
    const deposit = req.body.deposit;
    const date = req.body.date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const time = req.body.time;
    const fingerPrint = req.body.session;

    if(!name || ! phone || !bankId || !sportCourtId || !deposit || !date || !startTime || !endTime || !time){
      throw new Error("Missing required fields: name, date, startTime, endTime, time, phone, email, sportCourtId");
    }

    try {
      const reservationService = new ReservationService(name);
      const companyService = new CompanyService('System');
      const sessionService = new SessionService("System");

      const company = await companyService.findByCode(code);

      if(!company){
        throw new Error('Code Company Not Found');
      }

      const session: any = await sessionService.findByFingerPrint(fingerPrint);
      const sessionId = Number(session.id);

      const reservation = await reservationService.create(
        name,
        deposit,
        bankId,
        sportCourtId,
        Number(company.id),
        date,
        startTime,
        endTime,
        time,
        phone,
        discountCode,
        sessionId,
        null
      );
      return res.status(201).json({
        msg: "Create Reservation",
        reservation,
      });
    } catch (error) {
      console.error("ERROR: ", error);
      return res.status(400).json({
        err: true,
        error,
      });
    }
  }

  async createToken(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;
    console.log("DATA: ",dataUser)
    const code = req.params.code as string

    const name = req.body.name;
    const discountCode = req.body.discountCode;
    const phone = req.body.phone;
    const bankId = Number(req.body.bankId);
    const sportCourtId = Number(req.body.typeCourt);
    const deposit = req.body.deposit;
    const date = req.body.date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const time = req.body.time;
    const fingerPrint = req.body.session;

    if(!name || ! phone || !bankId || !sportCourtId || !deposit || !date || !startTime || !endTime || !time){
      throw new Error("Missing required fields: name, date, startTime, endTime, time, phone, email, sportCourtId");
    }


    try {
      const reservationService = new ReservationService(name);
      const companyService = new CompanyService('System');
      const company = await companyService.findByCode(code);

      if(!company){
        throw new Error('Code Company Not Found');
      }

      const sessionService = new SessionService("System");
      if (!dataUser) {
        await sessionService.findByFingerPrint(fingerPrint);
        await sessionService.addReport(
          "Posible Alteracion de TOKEN desde el Front"
        );
        throw Error("Error With DataUser");
      }
      const reservation = await reservationService.create(
        name,
        deposit,
        bankId,
        sportCourtId,
        Number(company?.id),
        date,
        startTime,
        endTime,
        time,
        phone,
        discountCode,
        null,
        Number(dataUser.id)
      );

      return res.status(201).json({
        msg: "Create Reservation",
        reservation,
      });
    } catch (error) {
      console.error("ERROR: ", error);
      return res.status(400).json({
        err: true,
        error,
      });
    }
  }

  async findByCode(req: Request, res: Response){
    const code = req.body.code;
    const reservationService = new ReservationService('System');

    try {
      const reservation = await reservationService.findByCode(code);
      return res.status(200).json({
        ok: true,
        error: null,
        reservation
      })
    } catch (error) {
      console.error("ERROR: ", error);

      return res.status(400).json({
        err: true,
        error,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    const dataUser: any = req.headers.dataUser;
    const reservationService = new ReservationService("dataUser.name");
    
    // Parámetros de paginación
    const limit = Number(req.body.limit) || 10;
    const page = Number(req.body.page) || 1;

    try {
      const { reservations, total } = await reservationService.getAll(limit, page, Number(dataUser.companyId));

      return res.status(200).json({
        Ok: true,
        data: reservations,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      })
    } catch (error) {
      console.error("ERROR: ", error);
      res.status(500).json({
        Ok: false,
        error: error
      })
    }
}
}
