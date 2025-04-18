import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import bcrypt from 'bcrypt';

export class UserController {

    constructor(){

    }

    async getUser(req: Request, res:Response){
        console.log("PASO")
        res.status(201).json({
            message: "User created successfully!",
        })
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
        const { email, password } = req.body;

        try {

            if (!email) {
                throw new Error('El email es requerido');
            }
    
            if (!password) {
                throw new Error('La contraseña es requerida');
            }

            const userService = new UserService();
            const user = await userService.loginUser(email, password);

        } catch (error) {
            return res.status(500).json({
                msg: "Something went wrong during login",
                error
            });
        }
    }
}