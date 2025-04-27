import { Reservation } from "../model/reservation.model";

export class ReservationService {
    
    private reservation: Reservation | undefined;
    private readonly currentUserEmail: string;
    
    constructor(currentUserName: string){
        this.currentUserEmail = currentUserName;
    }

    async getAll(){
        const reservation = await Reservation.findAll();
        return reservation;
    }

    async getById(reservationId: number){
        const reservation = await Reservation.findByPk(reservationId);

        if(!reservation){
            throw Error("Not Found Reservation");
        }
        this.reservation = reservation
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

        try {
            const newReservation = await Reservation.create({
                sessionId: sessionId || null,
                userId: userId || null,
                name,
                deposit: deposit || null,
                bankId: bankId || null,
                date,
                startTime,
                endTime,
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

}