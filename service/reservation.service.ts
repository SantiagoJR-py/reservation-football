import { createHash } from "crypto";
import { Reservation } from "../model/reservation.model";

export class ReservationService {
    
    private reservation: Reservation | undefined;
    private readonly currentUserEmail: string;
    
    constructor(currentUserName: string){
        this.currentUserEmail = currentUserName;
    }

    async getAll(limit: number = 10, page: number = 1) {
        // Contar el total de reservaciones
        const total = await Reservation.count();
        
        const reservations = await Reservation.findAll({
            attributes: ['id', 'name', 'phone', 'email', 'deposit', 'state', 'date', 'startTime', 'endTime','time', 'code'],
            include: [
                {
                    association: 'Bank',
                    attributes: ['id', 'name']
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: (page - 1) * limit
        });

        reservations.map((item:any) => item.get({ plain: true}))
        
        return {
            reservations,
            total
        };
    }

    async getById(reservationId: number){
        const reservation = await Reservation.findByPk(reservationId);

        if(!reservation){
            throw Error("Not Found Reservation");
        }
        this.reservation = reservation
    }

    async findByCode(code:string){
        const reservation = await Reservation.findOne({
            where: {
                code
            },
            attributes:['name', 'code', 'phone', 'deposit', 'email', 'startTime', 'endTime', 'time', 'date', 'state'],
            include: [
                {
                    association: 'Bank',
                    attributes: ['id', 'name']
                }
            ]
        })

        if(!reservation){
            throw Error("Not Found Reservation By Code");
        }

        return reservation;
    }

    async create(
        name: string,
        deposit: number,
        bankId: number,
        date: Date,
        startTime: string,
        endTime: string,
        time: string,
        email:string,
        phone:string,
        sessionId?: number | null,
        userId?: number | null,
    ): Promise<Reservation> {

        if (!name || !date || !startTime || !endTime || !time || !phone || !email) {
            throw new Error("Missing required fields: name, date, startTime, endTime, time, phone, email");
        }

        const code = this.generateShortCode();
        try {
            const newReservation = await Reservation.create({
                sessionId: sessionId || null,
                userId: userId || null,
                name,
                deposit: deposit || null,
                bankId: bankId || null,
                date,
                state: 'PENDING',
                startTime,
                endTime,
                code,
                time,
                email,
                phone,
                createdBy: this.currentUserEmail,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            this.reservation = newReservation;
            return newReservation;

        } catch (error) {
            console.error("Error creating reservation:", error);
            throw new Error("Failed to create reservation");
        }
    }

    generateShortCode(): string {
        const date = new Date().toISOString().split('T')[0];
        
        const hash = createHash('sha256')
          .update(Math.random().toString())
          .digest('hex')
          .substring(0, 20);
          
        return `${date}-${hash}`;
      }

}