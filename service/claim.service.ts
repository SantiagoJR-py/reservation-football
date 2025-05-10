import { Op } from "sequelize";
import Claim from "../model/claim.model";

export class ClaimService {
    private claim: Claim | undefined;
    private readonly currentUserEmail: string;

    constructor(currentUserName: string){
        this.currentUserEmail = currentUserName;
    }

    async create(title:string, description:string, reservationId?:number){
        try {
            if(!title || !description){
                throw Error("Missing required fields: title, description");
            }

            const newClaim = await Claim.create({
                title,
                description,
                reservationId: reservationId || null,
                state: 'PENDING',

                createdBy: this.currentUserEmail,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            
            this.claim = newClaim
            return newClaim;

        } catch (error) {
            console.error("Error creating Claim:", error);
            throw new Error("Failed to create Claim");
        }
    }

    async getAll(){
        const claim = await Claim.findAll({
            attributes: ['id', 'title', 'description', 'state'],
            include: [
                {
                    association: 'Reservation',
                    attributes: ['id', 'name', 'phone', 'code', 'deposit', 'startTime', 'endTime', 'time'], 
                }
            ]
        }) 
        
        return claim;
    }

    async findByCodeReservation(code:string){
        const claim = await Claim.findOne({
            attributes: ['id', 'title', 'description', 'state'],
            include: [
                {
                    association: 'Reservation',
                    where:{
                        code
                    },
                    attributes: ['id', 'name', 'phone', 'code', 'deposit', 'startTime', 'endTime', 'time'], 
                }
            ]
        })

        return claim;
    }

    async searchClaims(searchTerm: string, state?: string) {
        const whereClause: any = {
            [Op.or]: [
                { title: { [Op.iLike]: `%${searchTerm}%` } },
                { description: { [Op.iLike]: `%${searchTerm}%` } },
                { reservationId: { [Op.iLike]: `%${searchTerm}%` } }
            ]
        };

        if (state) {
            whereClause.state = state;
        }

        const claims = await Claim.findAll({
            where: whereClause,
            attributes: ['id', 'title', 'description', 'state'],
            include: [
                {
                    association: 'Reservation',
                    attributes: ['id', 'name', 'phone', 'code', 'deposit', 'startTime', 'endTime', 'time'],
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        return claims;
    }
}