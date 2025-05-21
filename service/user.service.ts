import User from "../model/user.model";
import { JwtService } from "./jwt.service";
import bcrypt from 'bcrypt';

export class UserService {

      private user: User | undefined;

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
                attributes: ['id', 'username', 'email', 'name', 'password', 'role', 'companyId']
            });
            return user?.get({ plain: true});
        } catch (error) {
            console.error('Error username:', error);
            throw new Error('Not Found User.');
        }
    }

    async getById(userId:number){
      const user = await User.findOne({
        where: {
          id: userId
        }
      })

      if (!user) {
        throw new Error('User Not Found');
      }

      this.user = user;
    }

    async updateImage(urlImage:string){
      if (!this.user) {
        throw new Error('User Not Found');
      }

      this.user.urlImage = urlImage;
      this.user.save();
    }

    async updateUser(name:string, username: string, email: string, identification: string, address: string, birthdate: Date){
      if (!this.user) {
        throw new Error('User Not Found');
      }

      try {
        this.user.name = name;
        this.user.username = username;
        this.user.email = email;
        this.user.identification = identification;
        this.user.address = address;
        this.user.birthdate = birthdate;
  
        this.user.save()
        
      } catch (error) {
        console.error("ERROR UPDATE: ", error);
      }
    }

    async getAllById(userId:number){
      const user = await User.findOne({
        where: {
          id: userId
        },
        attributes: ['id', 'name', 'username', 'email', 'role', 'identification', 'address', 'birthdate', 'urlImage', 'createdAt']
      })
      if (!user) {
        throw new Error('User Not Found');
      }

      return user.get({ plain: true })
    }

    async loginUser(email: string, password: string) {
      const user = await this.findByEmail(email);
      const jwtService = new JwtService();
    
      if (!user) {
        throw new Error('User Not Found');
      }
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
    
      if (!isPasswordValid) {
        throw new Error('Password Invalid');
      }
    
      const token = jwtService.generateToken({id: user.id, name: user.name, email: user.email, role: user.role, companyId: user.companyId})
      return {token, user};
    }
}