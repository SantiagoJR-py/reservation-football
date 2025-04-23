import User from "../model/user.model";
import { JwtService } from "./jwt.service";
import bcrypt from 'bcrypt';

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

      async findByEmail(email: string) {
        try {
            const user:any = await User.findOne({
                where: { email },
                attributes: ['id', 'username', 'email', 'name', 'password', 'role']
            });
            return user?.get({ plain: true});
        } catch (error) {
            console.error('Error username:', error);
            throw new Error('Not Found User.');
        }
    }

    async loginUser(email: string, password: string) {
      const user = await this.findByEmail(email);
      const jwtService = new JwtService();
    
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
    
      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
      }
    
      const token = jwtService.generateToken({id: user.id, name: user.name, email: user.email, role: user.role})
      return token;
    }
}