import { NextFunction, Request, Response } from "express";
import { JwtService } from "../service/jwt.service";

export function tokenVerify(req: Request, res: Response, next: NextFunction){
    const jwtService = new JwtService();
    const token: string = <string>req.headers.authorization?.split(' ')[1];
    console.log("HEADERS: ", req.headers);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const verify = jwtService.verifyToken(token);
        console.log("VERIFICACIÓN: ", verify);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
