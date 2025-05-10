import { Request, Response } from "express";
import { ClaimService } from "../service/claim.service";
import { error } from "console";

export class ClaimController {
    constructor(){

    }

    async getAll(req: Request, res:Response){
        const dataUser: any = req.headers.dataUser;
        const claimService = new ClaimService(dataUser.name);

        try {
            const data = await claimService.getAll();
            return res.status(200).json({
                ok: true,
                error: null,
                data
            })
        } catch (error) {
            console.error("ERROR: ",error)
            return res.status(400).json({
                ok: false,
                error
            })
        }
    }

    async create(req: Request, res:Response){
        const title = req.body.title;
        const description = req.body.description;
        const reservationId = req.body?.reservationId;

        const claimService = new ClaimService('System');
        try {
            await claimService.create(title, description, reservationId);

            return res.status(200).json({
                okt: true,
                error: null,
                msg: 'Claim Create'
            })
        } catch (error) {
            console.error("ERROR: ",error)
            return res.status(400).json({
                ok: false,
                error
            })
        }
    }

    async findByCodeReservation(req: Request, res:Response){
        const dataUser: any = req.headers.dataUser;
        const code = req.body?.code as string;
        
        const claimService = new ClaimService(dataUser.name);

        try {
            const data = await claimService.findByCodeReservation(code);
            return res.status(200).json({
                ok: true,
                error: null,
                data
            })
        } catch (error) {
            console.error("ERROR: ",error)
            return res.status(400).json({
                ok: false,
                error
            })
        }
    }

    async findByValue(req: Request, res:Response){
        const dataUser: any = req.headers.dataUser;
        const value = req.body?.value as string;
        
        const claimService = new ClaimService(dataUser.name);

        try {
            const data = await claimService.searchClaims(value);
            return res.status(200).json({
                ok: true,
                error: null,
                data
            })
        } catch (error) {
            console.error("ERROR: ",error)
            return res.status(400).json({
                ok: false,
                error
            })
        }
    }
}