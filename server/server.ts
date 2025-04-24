import path from 'path';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from "cors";
import routerSession from '../router/session.router';
import routerUser from '../router/user.router';
import User from '../model/user.model';
import Session from '../model/session.model';
import Bank from '../model/bank.model';
import { Reservation } from '../model/reservation.model';
import routerBank from '../router/bank.router';

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
}

middlewares() {
  this.app.use('/uploads', express.static(path.resolve(__dirname, '../../uploads')));
  this.app.use(express.json());
  const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  };
  this.app.use(cors(corsOptions));
}


syncDatabase = async () => {
  try {
    await User.sync({ force: false });  
    await Session.sync({ force: false }); 
    await Bank.sync({ force: false }); 
    await Reservation.sync({ force: false }); 
    console.log("Tablas sincronizadas exitosamente");
  } catch (error) {
    console.error("Error al sincronizar las tablas:", error);
  }
};
}
