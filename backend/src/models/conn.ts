import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Trading",{}).then(()=>{
    console.log("Connection Successfull")
})
.catch((err)=>{
    console.log("NO Connection");})