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
            const user:any = await User.findOne({
                where: { username },
                attributes: ['id', 'username', 'name', 'password', 'role']
            });
            return user?.get({ plain: true});
        } catch (error) {
            console.error('Error username:', error);
            throw new Error('Not Found User.');
        }
    }

}