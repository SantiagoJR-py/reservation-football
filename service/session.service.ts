import Session from "../model/session.model";


export class SessionService {
    constructor() { }

    async add(session:any){
        try {
            const newUser = await Session.create(session);
            return newUser;
          } catch (error) {
            console.error('Error creating session:', error);
          }
    }

    async getAll(){
      try {
        const sessions = await Session.findAll({
          order: [['createdAt', 'DESC']],
        })
        return sessions
      } catch (error) {
        console.error('Error find session:', error);
      }
    }
}