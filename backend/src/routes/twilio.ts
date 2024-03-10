import express, {Request,Response} from "express";

const accountSid = process.env.TWILIO_ACCOUNT_ID ;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_ID;

const client = require("twilio")(accountSid,authToken);
import Model from "../models/user";
import KycModel from "../models/kyc";


const router = express.Router();

router.post("/send-otp", async (req:Request,res:Response)=>{
    let {phone} = req.body;
    phone = `+91${phone}`;

    let user = Model.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({message:"User not found, please enter correct name"});
    }

    let newUser = new KycModel(req.body);
    await newUser.save();

    try {
        const response = await client.verify.v2.services(verifySid)
        .verifications.create({ to: phone, channel: "sms" });

        return res.status(200).json({message:"Otp send successfully"});
        
    } catch (error) {
     console.log(error);
     return res.status(400).json({message:"Error sending otp"});   
    }
});

router.post("/verify-otp",async (req:Request,res:Response)=>{
    let {phone,otp} = req.body;
    phone = `+91${phone}`;

    try {
        const response = await client.verify.v2.services(verifySid)
        .verificationChecks.create({to:phone,code:otp});

        return res.status(200).json({message:"OTP verified successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error verifying otp!!!"});
    }
})

export default router;