import Bank from "../model/bank.model";

export class BankService {
    private bank: Bank | undefined;
    private readonly currentUserEmail: string;

    constructor(currentUserEmail: string){
        this.currentUserEmail = currentUserEmail;
    }

    async getAll(){
        const bank = await Bank.findAll({
            attributes: ['id', 'nit', 'name']
        })

        return bank;
    }

    async getById(id:number){
        const bank = await Bank.findOne({
            where: {id},
            attributes: ['id', 'nit', 'name']
        })

        if (!bank) {
            throw new Error(`Bank with ID ${id} not found`);
        }
        
        this.bank = bank;

        return bank;
    }
}