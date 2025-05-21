import { Request, Response } from "express";
import { SportCourtService } from "../service/sport-court.service";

export class SportCourtController {
    constructor() {}

    async addSportCourt(req: Request, res: Response) {
        const dataUser: any = req.headers.dataUser;
        const sportCourt:any = req.body.sportCourt;
        
        if (!req.body.sportCourt) {
            return res.status(400).json({
                msg: "No se enviaron parámetros requeridos"
            });
        }

        const sportCourtService = new SportCourtService(dataUser.email);
        try {
            const newSportCourt = {
                sportCourt,
                createdBy: dataUser.email,
                updatedBy: dataUser.email
            };

            const data = await sportCourtService.addSportCourt(newSportCourt);

            if (!data) {
                return res.status(400).json({
                    msg: "Datos de cancha deportiva inválidos"
                });
            }

            return res.status(201).json({
                msg: 'Cancha deportiva creada exitosamente',
                data: sportCourt
            });
        } catch (error) {
            console.error('Error creating sport court:', error);
            return res.status(500).json({
                message: 'Ocurrió un error al crear la cancha deportiva',
                error: error instanceof Error ? error.message : 'Error desconocido'
            }); 
        }
    }

    async editSportCourt(req: Request, res: Response) {
        const dataUser: any = req.headers.dataUser;
        const sportCourtId = Number(req.params.sportCourtId);
        
        if (!req.body.sportCourt || !sportCourtId) {
            return res.status(400).json({
                msg: "No se enviaron parámetros requeridos"
            });
        }

        const sportCourtService = new SportCourtService(dataUser.email);
        try {
            await sportCourtService.getById(sportCourtId);
            const updatedSportCourt = await sportCourtService.editSportCourt(
                sportCourtId, 
                {
                    ...req.body.sportCourt,
                    updatedBy: dataUser.email
                }
            );

            if (!updatedSportCourt) {
                return res.status(400).json({
                    msg: "Datos de cancha deportiva inválidos"
                });
            }

            return res.status(200).json({
                msg: 'Cancha deportiva actualizada exitosamente',
                data: updatedSportCourt
            });
        } catch (error) {
            console.error('Error updating sport court:', error);
            return res.status(500).json({
                message: 'Ocurrió un error al actualizar la cancha deportiva',
                error: error instanceof Error ? error.message : 'Error desconocido'
            }); 
        }
    }

    async deleteSportCourt(req: Request, res: Response) {
        const dataUser: any = req.headers.dataUser;
        const sportCourtId = Number(req.params.sportCourtId);

        if (!sportCourtId) {
            return res.status(400).json({
                msg: "No se proporcionó ID de cancha deportiva"
            });
        }

        const sportCourtService = new SportCourtService(dataUser.email);
        try {
            await sportCourtService.deleteSportCourt(sportCourtId);

            return res.status(200).json({
                ok: true,
                msg: `Cancha deportiva con ID ${sportCourtId} eliminada`
            });
        } catch (error) {
            console.error('Error deleting sport court:', error);
            return res.status(500).json({
                message: 'Ocurrió un error al eliminar la cancha deportiva',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    async getAll(req: Request, res: Response) {
        const sportCourtService = new SportCourtService('system');
        try {
            const sportCourts = await sportCourtService.getAll();

            return res.status(200).json({
                ok: true,
                data: sportCourts
            });
        } catch (error) {
            console.error('Error finding sport courts:', error);
            return res.status(500).json({
                message: 'Ocurrió un error al buscar las canchas deportivas',
                error: error instanceof Error ? error.message : 'Error desconocido'
            }); 
        }
    }

    async getAllByForm(req: Request, res: Response) {
        const sportCourtService = new SportCourtService('system');
        try {
            const sportCourts = await sportCourtService.getAllByForm();

            return res.status(200).json({
                ok: true,
                data: sportCourts
            });
        } catch (error) {
            console.error('Error finding sport courts:', error);
            return res.status(500).json({
                message: 'Ocurrió un error al buscar las canchas deportivas',
                error: error instanceof Error ? error.message : 'Error desconocido'
            }); 
        }
    }

    async getById(req: Request, res: Response) {
        const sportCourtId = Number(req.params.sportCourtId);
        
        if (!sportCourtId) {
            return res.status(400).json({
                msg: "No se proporcionó ID de cancha deportiva"
            });
        }

        const sportCourtService = new SportCourtService('system');
        try {
            const sportCourt = await sportCourtService.getById(sportCourtId);

            return res.status(200).json({
                ok: true,
                data: sportCourt
            });
        } catch (error) {
            console.error('Error finding sport court:', error);
            return res.status(500).json({
                message: 'Ocurrió un error al buscar la cancha deportiva',
                error: error instanceof Error ? error.message : 'Error desconocido'
            }); 
        }
    }
}