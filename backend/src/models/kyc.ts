import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type KycDataType = {
  email: string;
  aadhar: string;
  phone: number;
  pan:string;
  amount?:number;
};

const Schema = new mongoose.Schema<KycDataType>({
    email:{type:String,required:true,unique:true},
    aadhar:{type:String,required:true,unique:true,length:12},
    phone:{type:Number,required:true,unique:true,length:10},
    pan:{type:String,required:true,unique:true,length:10},
    amount:{type:Number}
});

Schema.pre("save",async function(next){
  if(this.isModified("aadhar") && this.isModified("pan")){
    this.aadhar = await bcrypt.hash(this.aadhar.toString(),8);
    this.pan = await bcrypt.hash(this.pan.toString(),8);
  };
  next();
})

const KycModel = mongoose.model<KycDataType>("kycModel",Schema);

export default KycModel;
