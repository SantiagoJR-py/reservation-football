import User from "../model/user.model";

export class UserService {
    constructor(){

    }

    async createUser(userData: any ) {
      console.log("DATA: ",userData);
        try {
          const newUser = await User.create(userData);
          return newUser;
        } catch (error) {
          console.error('Error creating user:', error);
          throw new Error('Unable to create user');
        }
      }

      async findByUsername(username: string) {
        try {
            const user = await User.findOne({
                where: { username },
            });
            return user;
        } catch (error) {
            console.error('Error username:', error);
            throw new Error('Not Found User.');
        }
    }

}