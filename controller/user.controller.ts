import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { UserService } from "../service/user.service";
import { JwtService } from "../service/jwt.service";

export class UserController {

    constructor(){

    }

    async createUser(req: Request, res:Response){
        console.log(req.body);
        const { fullName, username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { name: fullName, username, password: hashedPassword, email}

        try {
            const userServices = new UserService();
            await userServices.createUser(user)
            
            res.status(201).json({
                message: "User created successfully!",
            })
            
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                message: 'An error occurred while creating the user. Please try again later.',
              });
        }

    }

    async login(req: Request, res:Response){
        const { username, password } = req.body;

        const jwtService = new JwtService();

        try {
            const userService = new UserService();
            const user = await userService.findByUsername(username);

            if(!user){
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    msg: "Invalid credentials"
                });
            }


            
                const token = jwtService.generateToken({ id: user.id, username: user.username });

                return res.json({
                    msg: "Login successful",
                    user: { name: user.name, username: user.username, role: user.role },
                    token: token
                });

        } catch (error) {
            return res.status(500).json({
                msg: "Something went wrong during login",
                error
            });
        }
    }
}