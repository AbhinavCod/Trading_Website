import { useForm } from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client";
import {Link, useNavigate} from "react-router-dom"
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

export type SignUpData = {
    fullName : string;
    email: string;
    country : string;
    age : number;
    password : string;
    confirmPassword: string;
}

const SignUpForm = () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const navigate = useNavigate();

    const {darkMode} = useTheme();
    
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData>();


  
  const mutation = useMutation(apiClient.signup,{

    onSuccess : async ()=>{
        showToast({message:"Signed Up 👌",type:"SUCCESS"});
        await queryClient.invalidateQueries("validateToken");
        console.log("I am here");
        navigate("/kyc");
    },
    onError:()=>{
        showToast({message:"Failed to sign up ",type:"ERROR"});
    }
  })

  const style2 = {
    border : "1px solid gray"
  }



  const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data);
  })

  return (
    <div className={`container`}>


    <form className={`flex flex-col gap-8 px-4 py-4 mt-20 rounded-2xl mx-4  ${darkMode ? "bg-gray-900" : "bg-white"}`}  onSubmit={onSubmit}>
    <h2 className={`text-6xl font-semibold mb-8 ${darkMode ? "text-gray-200" : ""} `} style={{color:"#387ED1"}}>Register yourself here</h2>
    <h2 className={`text-3xl font-normal  ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Open your demat account in less than a minute</h2>
    <hr></hr>

    <div className="flex flex-col md:flex-row gap-5">
        <label  className={`text-sm font-bold flex-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Full Name :
            <input className={`rounded w-full border py-1 px-2 font-normal ${darkMode ? "bg-gray-800" : null}`} style={style2} {...register("fullName",{required:"Full Name is required"})}></input>
            {errors.fullName && (
                <span className="text-red-500">{errors.fullName.message}</span>
            )}
        </label>
    </div>

    <div className="flex flex-col md:flex-row gap-5">

    <label className={`text-sm font-bold flex-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Email :
            <input className={`rounded w-full border py-1 px-2 font-normal ${darkMode ? "bg-gray-800" : null}`}  style={style2}{...register("email",{
                required:"Email is required",
                validate:{
                    matchPattern : (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid Email"
                }
            })}></input>
            {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}
        </label>
    <label className={`text-sm font-bold flex-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Country :
            <input className={`rounded w-full border py-1 px-2 font-normal ${darkMode ? "bg-gray-800" : null}`} style={style2} {...register("country",{required:"Country Name is required"})}></input>
            {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
            )}
        </label>
    </div>

    <div className="flex flex-col md:flex-row gap-5">

    <label className={`text-sm font-bold flex-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Age :
            <input type="number"className={`rounded w-full border py-1 px-2 font-normal ${darkMode ? "bg-gray-800" : null}`} style={style2} min={0} max={100} {...register("age",{
                minLength:{
                    value:0,
                    message:"Age cannot be less than 0",
                },
                maxLength:{
                    value:100,
                    message:"Age must be less than 100",
                },
                required:"Age is required",
            })}></input>
            {errors.age && (
                <span className="text-red-500">{errors.age.message}</span>
            )}
        </label>

    <label className={`text-sm font-bold flex-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Password :
            <input type="password" className={`rounded w-full border py-1 px-2 font-normal ${darkMode ? "bg-gray-800" : null}`} style={style2}
             {...register("password",{required:"Password is required",
             minLength:{
                value:8,
                message:"Password must contain atleast 8 characters"
             }})}>

             </input>
            {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
            )}
        </label>
    <label className={`text-sm font-bold flex-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Confirm Password :
            <input type="password" className={`rounded w-full border py-1 px-2 font-normal ${darkMode ? "bg-gray-800" : null}`} style={style2} {...register("confirmPassword",
            {required:"Confirm Password does not match!!",
            validate:(val)=>{
                if(!val){
                    return "This field is required"
                }else if(watch("password") !== val){
                    return "Passwords does not match!!"
                }
            }})}></input>
            {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
            )}
        </label>
    </div>

    <span className="flex items-center justify-between">
          <span className={`text-sm ${darkMode ? "text-gray-200" : ""}`}>
            Already Registered?{" "}
            <Link className="underline" to="/login">
              Login Here
            </Link>
          </span>
          
        
        <button type="submit" className={`font-bold w-fit py-1 px-2 hover:rounded-lg hover:bg-blue-500 hover:text-white ${darkMode ? "text-gray-200" : "bg-white text-gray-700 "}`}>
            Create my Account
        </button>
        </span>


        

</form>
</div>
  );
};

export default SignUpForm;
