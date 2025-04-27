import { Request, Response } from "express";
import { SessionService } from "../service/session.service";

export class SessionController {
    constructor(){

    }

    async add(req:Request, res: Response){
        console.log("LLEGA")
        const {userAgent, ip, browser, device, os, fingerPrint, report} = req.body

        const object = {
            userAgent, browser, device, os, ip, fingerPrint, report
        }

        try {
            const sessionService = new SessionService('System');
            const validFingerPrint = await sessionService.findByFingerPrint(fingerPrint);
            if(validFingerPrint.length > 0){
                return res.status(200).json({
                    msg: 'FingerPrint exist',
                    fingerPrint
                })
            }

            const session = sessionService.add(object)
            if(!session){
                return res.status(400).json({
                    msg: "Invalid Session"
                });
            }
            return res.status(201).json({
                message: "Session created successfully!",
                fingerPrint
            })

        } catch (error) {
            console.error('Error creating session:', error);
            return res.status(500).json({
                message: 'An error occurred while creating the session.',
              });
        }
    }

    async getAll(req: Request, res: Response){
        try {
            const sessionService = new SessionService('System');
            const session = await sessionService.getAll()

            return res.status(200).json({
                ok: true,
                session
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'An error occurred while find the session.',
              });
        }
    }
}