import { Request, Response } from "express";
import { BankService } from "../service/bank.service";

export class BankController {
    constructor() {}

    async addBank(req: Request, res:Response){
        const dataUser : any = req.headers.dataUser;
        const newBank = {
            ...req.body.bank,
            createdBy: dataUser.name
        };

        if (!req.body.bank) {
            throw new Error('Not send params');
        }

        const bankService = new BankService(dataUser.name);
        try {

            const bank = bankService.addBank(newBank);

            if(!bank){
                return res.status(400).json({
                    msg: "Invalid Bank"
                });
            }
            return res.status(200).json({
                msg: 'Create successfull'
            })
        } catch (error) {
            console.error('Error creating bank:', error);
            return res.status(500).json({
                message: 'An error occurred while creating the bank.',
              }); 
        }

    }

    async editBank(req: Request, res:Response){
        const dataUser : any = req.headers.dataUser;
        const bankId = Number(req.params.bankId);
        const newBank = req.body.bank

        if (!req.body.bank) {
            throw new Error('Not send params');
        }

        const bankService = new BankService(dataUser.name);
        try {

            await bankService.getById(bankId);
            const bank = bankService.editBank(newBank.nit, newBank.name, newBank.state);

            if(!bank){
                return res.status(400).json({
                    msg: "Invalid Bank"
                });
            }
            return res.status(200).json({
                msg: 'Edit successfull'
            })
        } catch (error) {
            console.error('Error creating bank:', error);
            return res.status(500).json({
                message: 'An error occurred while creating the bank.',
              }); 
        }

    }

    async deleteBank(req: Request, res: Response){
        const bankId = Number(req.params.bankId);
        const bankService = new BankService('System');

        if (!bankId) {
            throw new Error('Not send params');
        }

        try {
            await bankService.deleteBank(bankId);

            res.status(200).json({
                ok: true,
                msg: `Bank Id ${bankId} Deleted`
            })

        } catch (error) {
            
        }
    }

    async getAll(req: Request, res: Response){
        const bankService = new BankService('System');
        try {
            const bank = await bankService.getAll();

            return res.status(200).json({
                ok: true,
                bank
            })
        } catch (error) {
            console.error('Error find banks:', error);
            return res.status(500).json({
                message: 'An error occurred while find the banks.',
              }); 
        }
    }

    async getById(req: Request, res: Response){
        const bankId = Number(req.params.id);
        const bankService = new BankService('System');
        try {
            const bank = await bankService.getById(bankId);

            return res.status(200).json({
                ok: true,
                bank
            })
        } catch (error) {
            console.error('Error find banks:', error);
            return res.status(500).json({
                message: 'An error occurred while find the banks.',
              }); 
        }
    }
}