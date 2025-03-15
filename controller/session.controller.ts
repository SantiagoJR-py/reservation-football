import { Request, Response } from "express";
import { SessionService } from "../service/session.service";

export class SessionController {
    constructor(){

    }

    async add(req:Request, res: Response){
        const {userAgent, browser, device, os} = req.body

        const object = {
            userAgent, browser, device, os
        }

        try {
            const sessionService = new SessionService();
            const session = sessionService.add(object)
            if(!session){
                return res.status(400).json({
                    msg: "Invalid Session"
                });
            }
            return res.status(201).json({
                message: "Session created successfully!",
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
            const sessionService = new SessionService();
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