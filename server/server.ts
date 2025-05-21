import path from 'path';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from "cors";
import routerSession from '../router/session.router';
import routerUser from '../router/user.router';
import User from '../model/user.model';
import Session from '../model/session.model';
import Bank from '../model/bank.model';
import { Reservation, setupReservationRelationships } from '../model/reservation.model';
import routerBank from '../router/bank.router';
import routerSecurity from '../router/security.router';
import { sequelize } from '../config/connection.db';
import ReservationDocument, { setupReservationDocumentRelationships } from '../model/reservation-document.model';
import routerReservation from '../router/reservation.router';
import routerReservationDocument from '../router/reservation-document.router';
import Claim, { setupClaimRelationships } from '../model/claim.model';
import routerClaim from '../router/claim.router';
import SportCourt from '../model/sport-court.model';
import routerSportCourt from '../router/sport-court.router';
import Company from '../model/company.model';

// Cargar variables del archivo .env
dotenv.config();

export class Server {
  private app: Application;
  private port: any;

  constructor(){
      this.app = express();
      this.port = Number(process.env.PORT);
      this.listen();
      this.middlewares();
      this.routes();
      this.syncDatabase();
      
  }

  listen(){
    this.app.listen(this.port, () =>{
        console.log('Aplicacion corriendo en el puerto: ' + this.port)
    })
}

routes(){
  this.app.use('/app/user', routerUser);
  this.app.use('/app/session', routerSession);
  this.app.use('/app/bank', routerBank);
  this.app.use('/app/security', routerSecurity);
  this.app.use('/app/reservation', routerReservation);
  this.app.use('/app/reservationDocument', routerReservationDocument);
  this.app.use('/app/claim', routerClaim);
  this.app.use('/app/sportCourt', routerSportCourt);
}

middlewares() {
  this.app.use('/uploads', express.static(path.resolve(__dirname, '../../uploads')));
  this.app.use(express.json());
  const corsOptions = {
    // origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  };
  this.app.use(cors(corsOptions));
}


syncDatabase = async () => {
  try {
    // await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await User.sync({ force: false });  
    await Company.sync({ force: false })
    await Session.sync({ force: false }); 
    await Bank.sync({ force: false });
    await SportCourt.sync({ force: false });
    await Reservation.sync({ force: false }); 
    await ReservationDocument.sync({ force: false });
    await Claim.sync({ force: false });
    // 3. Reactivar FK checks
    // await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    //-------------------- Relaciones --------------------//

    setupReservationRelationships();
    setupReservationDocumentRelationships();
    setupClaimRelationships();

    console.log("Tablas sincronizadas exitosamente");
  } catch (error) {
    console.error("Error al sincronizar las tablas:", error);
  }
};
}
