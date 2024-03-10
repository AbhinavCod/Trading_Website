import express,{Request,Response} from "express";
import {check,validationResult} from "express-validator";
import Model from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/login",[
    check("email","Email is required").isEmail(),
    check("password","Password must be atleast 8 character long.").isLength({min:8}),
], async (req:Request,res:Response)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});
    };

    try {
        const {email,password} = req.body;
        let user = await Model.findOne({email:email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        };

        const isMatch  = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign({userId:user.id},"ezTKcDwqnfcM8JvYDbNB7NBDkxAQ5TXw",{expiresIn:"1d"});
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            maxAge:86400000,
        });

        return res.status(200).json({userId:user._id});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"User login failed!!!"});
    }
});

router.get("/validate-token",verifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId});
});

router.post("/logout", (req:Request,res:Response)=>{
    res.cookie("auth_token","",{
        expires:new Date(0),
    });
    res.send();
});

export default router;