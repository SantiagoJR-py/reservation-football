import { Request, Response } from "express";
import { ReservationService } from "../service/reservation.service";
import { SessionService } from "../service/session.service";

export class ReservationController {
  constructor() {}

  async create(req: Request, res: Response) {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const bankId = Number(req.body.bankId);
    const deposit = req.body.deposit;
    const date = req.body.date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const time = req.body.time;
    const fingerPrint = req.body.session;

    try {
      const reservationService = new ReservationService(name);
      const sessionService = new SessionService("System");
      const session: any = await sessionService.findByFingerPrint(fingerPrint);
      const sessionId = Number(session.id);

      const reservation = await reservationService.create(
        name,
        deposit,
        bankId,
        date,
        startTime,
        endTime,
        time,
        email,
        phone,
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

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const bankId = Number(req.body.bankId);
    const deposit = req.body.deposit;
    const date = req.body.date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const time = req.body.time;
    const fingerPrint = req.body.session;

    try {
      const reservationService = new ReservationService(name);
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
        date,
        startTime,
        endTime,
        time,
        email,
        phone,
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
}
