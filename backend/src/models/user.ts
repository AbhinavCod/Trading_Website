import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
    _id:string;
    fullName : string;
    email : string;
    country : string;
    age : number;
    password: string;
}

const Schema = new mongoose.Schema<UserType>({
    fullName:{type:String,required:true},
    email :{type:String,required:true,unique:true},
    country :{type:String,required:true},
    age :{type:Number,required:true},
    password:{type:String,required:true},
});

Schema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await  bcrypt.hash(this.password,8);
    }
    next();
})

const Model = mongoose.model<UserType>("model",Schema);

export default Model;