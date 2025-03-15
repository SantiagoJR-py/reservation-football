import User from "../model/user.model";

export class UserService {
    constructor(){

    }

    async createUser(userData: any ) {
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
            console.error('Error al buscar el usuario por username:', error);
            throw new Error('No se pudo realizar la búsqueda del usuario.');
        }
    }

}