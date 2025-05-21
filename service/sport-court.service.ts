import SportCourt, { SportCourtInteface } from "../model/sport-court.model";

export class SportCourtService {
    private sportCourt: SportCourt | undefined;
    private readonly currentUserEmail: string;

    constructor(currentUserEmail: string) {
        this.currentUserEmail = currentUserEmail;
    }

    async getAll() {
        const sportCourts = await SportCourt.findAll({
            attributes: ['id', 'name', 'size', 'state']
        });
        return sportCourts;
    }

    async getAllByForm() {
        const sportCourts = await SportCourt.findAll({
            attributes: ['id', 'name']
        });
        return sportCourts;
    }

    async addSportCourt(sportCourtData: any) {
        console.log("DATOS: ",sportCourtData);
        try {
            const newSportCourt = await SportCourt.create({
                name: sportCourtData.sportCourt.name,
                size: sportCourtData.sportCourt.size,
                state: sportCourtData.sportCourt.state,
                createdAt: new Date(),
                createdBy: this.currentUserEmail,
                updatedBy: this.currentUserEmail
            });
            return newSportCourt;
        } catch (error) {
            console.error("Error creating sport court", error);
            throw error;
        }
    }

    async editSportCourt(id: number, updateData: any) {
        console.log("DATA: ",updateData)
        const sportCourt = await this.getById(id);
        
        try {
            const updatedSportCourt = await sportCourt.update({
                name: updateData.name,
                size: updateData.size,
                state: updateData.state,
                updatedBy: this.currentUserEmail,
                updatedAt: new Date()
            });
            
            this.sportCourt = updatedSportCourt;
            return updatedSportCourt;
        } catch (error) {
            console.error("Error updating sport court", error);
            throw error;
        }
    }

    async deleteSportCourt(id: number) {
        try {
            const sportCourt = await this.getById(id);
            await sportCourt.update({
                deletedBy: this.currentUserEmail
            });
            await sportCourt.destroy();
            return true;
        } catch (error) {
            console.error("Error deleting sport court", error);
            throw error;
        }
    }

    async getById(sportCourtId: number) {
        const sportCourt = await SportCourt.findOne({
            where: { id: sportCourtId },
            attributes: ['id', 'name', 'size', 'state', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt']
        });

        if (!sportCourt) {
            throw new Error(`Sport court with ID ${sportCourtId} not found`);
        }

        this.sportCourt = sportCourt;
        return sportCourt;
    }
}