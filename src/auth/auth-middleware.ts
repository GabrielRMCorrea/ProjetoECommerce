import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import {validateDevice} from "./auth-route";

const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    if (!req.headers.authorization) {
        return res.status(401).send()
    }

    try {
        jwt.verify(req.headers.authorization.replace('bearer ', ''), process.env.JWT_SECRET || "")


    }  catch (error: any) {
        return res.status(403).send()
    }

    try {
        const userId = jwt.verify(req.headers.authorization.replace('bearer ', ''), process.env.JWT_SECRET || "")
        
        if (!validateDevice(Number(userId), req.ip)) {
            return res.status(403).json({ message: "Token inválido ou expirado." });
          }
        
          res.locals.userId = userId
        return next()

    } catch ( error: any) {
        return res.status(400).send()
    }

}


export default authMiddleware