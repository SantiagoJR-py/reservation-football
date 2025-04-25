import { Request, Response } from "express";
import { JwtService } from "../service/jwt.service";

export class SecurityController{

  constructor() {}

  async validateToken(req: Request, res: Response){
    const token = req.params.token as string;
    const JWTService = new JwtService();

    try {
        const validateToken = JWTService.verifyToken(token);
        return res.status(200).json({
            validateToken
        })
    } catch (error) {
        console.error("ERROR: ",error)
        return res.status(401).json({
            msg: 'Denied'
        })
    }

  }
    
}