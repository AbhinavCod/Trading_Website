import express, {Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
// require("./models/conn");
import mongoose, { mongo } from "mongoose";
import userRoutes from "./routes/user";
import otpRoutes from "./routes/twilio";
import paymentRoutes from "./routes/stripe";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";


mongoose.connect("mongodb+srv://dewalabhinav855:zaXbuM7fRDrNAD2T@cluster0.fcau0c2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connection build successfully");
}).catch(()=>{
    console.log("No connection build");
})



const port = 2000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/twilio",otpRoutes);
app.use("/api/stripe",paymentRoutes);

app.listen(port,()=>{
    console.log(`Listening at ${port}`);
})