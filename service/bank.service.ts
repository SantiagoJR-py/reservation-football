import Bank from "../model/bank.model";

export class BankService {
    private bank: Bank | undefined;
    private readonly currentUserEmail: string;

    constructor(currentUserName: string){
        this.currentUserEmail = currentUserName;
    }

    async getAll(){
        const bank = await Bank.findAll({
            attributes: ['id', 'nit', 'name', 'state']
        })

        return bank;
    }

    async addBank(bank:any){
        try {
            const newBank = await Bank.create(bank);
            return newBank;
        } catch (error) {
            console.error("Error create bank", error);
        }
    }

    async editBank(nit:string, name:string, state:string){
        if (!this.bank) {
            throw new Error('Not Found Bank');
        }

        this.bank.nit = nit;
        this.bank.name = name;
        this.bank.state = state;

        await this.bank.save();

        return this.bank;
    }

    async deleteBank(id:number){
        try {
            await Bank.destroy({
                where: {id: id}
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getById(bankId:number){
        const bank = await Bank.findOne({
            where: {id: bankId},
            attributes: ['id', 'nit', 'name', 'state']
        })

        if (!bank) {
            throw new Error(`Bank with ID ${bankId} not found`);
        }
        
        this.bank = bank;

        return bank;
    }
}