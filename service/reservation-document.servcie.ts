import ReservationDocument from "../model/reservation-document.model";

export class ReservationDocumentService {

    private reservationDocument: ReservationDocument | undefined;
    private readonly currentUserEmail: string;
        
    constructor(currentUserName: string){
        this.currentUserEmail = currentUserName;
    }

    async add(reservationDocument:any){
        if(!reservationDocument){
            throw Error("Reservation Document is empty fields");
        }
        const documentReservation = await ReservationDocument.create(reservationDocument);

        return documentReservation.get({ plain:true });
    }
    
}