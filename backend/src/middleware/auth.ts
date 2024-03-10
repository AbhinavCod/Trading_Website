import { Request,Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            userId:string;
        }
    }
}

const verifyToken =  (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies["auth_token"];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    };

    try {
        const decoded = jwt.verify(token,"ezTKcDwqnfcM8JvYDbNB7NBDkxAQ5TXw");
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        res.status(400).json({message:"Unauthorized"});
    }
};

export default verifyToken;