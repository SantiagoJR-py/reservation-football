import Session from "../model/session.model";

export class SessionService {
        private session: Session | undefined;
        private readonly currentUserEmail: string;
        
        constructor(currentUserName: string){
            this.currentUserEmail = currentUserName;
        }
    

    async add(session:any){
        try {
            const newUser = await Session.create(session);
            return newUser;
          } catch (error) {
            console.error('Error creating session:', error);
          }
    }

    async getSessionByFingerPrint(fingerPrint: string){
      const session = await Session.findOne({
        where: {
          fingerPrint
        }
      })

      if(!session){
        throw Error("Not Found FingerPrint");
      }

      this.session = session;
    }

    async findByFingerPrint(fingerPrint:string){
      const session = await Session.findAll({
        where: {
          fingerPrint
        }
      })

      return session.map((item:any) => item.get({ plain: true }));
    }

    async addReport(report:string){
      if(!this.session){
        throw Error("Not Found Session");
      }

      this.session.report = report;
      this.session.save();
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