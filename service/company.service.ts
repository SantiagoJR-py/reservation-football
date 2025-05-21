import Company from "../model/company.model";
import crypto from 'crypto';

export class CompanyService {
    private company: Company | undefined;
    private readonly currentUserEmail: string;

    constructor(currentUserName: string){
        this.currentUserEmail = currentUserName;
    }

    async getAll(){
        const company = await Company.findAll({
            where: {
                state: 'ENABLED'
            },
            attributes: ['id', 'name', 'code', 'address', 'email', 'phone', 'NIT', 'urlImage', 'state']
        })

        return company;
    }

    async getById(id: number){
        const company = await Company.findByPk(id);

        if(!company){
            throw Error('Not Found Company ')
        }

        this.company = company; 
    }

    async findById(id: number){
        const company = await Company.findByPk(id);

        return company; 
    }

    async findByNIT(NIT: string){
        const company = await Company.findByPk(NIT);

        return company; 
    }

    async createCompany(data:any){
        const company = await Company.create({
            name: data.name,
            code: crypto.createHash('sha256').update(data.code).digest('hex').slice(0, 15),
            address: data.address,
            phone: data.phone,
            email: data.email,
            NIT: data.nit,
            state: 'ENABLED',
            createdBy: this.currentUserEmail,
            createdAt: new Date()
        });
        
        return company;
    }

    async updateCompany(id:number, data:any){
        await this.getById(Number(id));

        if (!this.company) {
            throw new Error('User Not Found');
        }

        this.company.name = data.name,
        this.company.code = data.code,
        this.company.address = data.address,
        this.company.phone = data.phone,
        this.company.email = data.email,
        this.company.NIT = data.nit,
        this.company.updatedBy = this.currentUserEmail,
        this.company.updatedAt = new Date()

        this.company.save();

        return this.company;
    }

    async delete(id:number){
        await this.getById(id);

        if (!this.company) {
            throw new Error('User Not Found');
        }
        
        this.company.state = 'DELETED'
        this.company.deletedBy = this.currentUserEmail,
        this.company.deletionAt = new Date()

    }
}