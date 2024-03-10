import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

export type LoginFormData = {
    email:string;
    password:string;
}


const Login = ()=>{

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.login,{

        onSuccess : async (userId)=>{
            showToast({message:"Signed in successfully 👌",type:"SUCCESS"});
            console.log(userId)
            await queryClient.invalidateQueries("validateToken");
            navigate(`/trading`);
        },
        onError:()=>{
            showToast({message:"Signed in failed",type:"ERROR"});
            alert("Invalid Credentials!!!");
            console.log("Invalid Credentials");
        }
    })
    const {register,handleSubmit,formState:{errors}} = useForm<LoginFormData>();
    
    
      const style2 = {
        border : "1px solid gray"
      }

      const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data);
      })

      const {darkMode} = useTheme();

    return (
        <div className={`container  mx-auto ${darkMode ? "bg-gray-900" : ""}`} style={{width:"60rem",height:"30rem"}}>


    <form className={`flex flex-col gap-8 px-4 py-4 mt-20  mx-4  ${darkMode ? "bg-gray-900 border-none" :"bg-white rounded-2xl"}`} style={{border:"1px solid gray",width:"100%",height:"30rem"}} onSubmit={onSubmit}>
    <h2 className="text-6xl text-center font-semibold text-blue-500 py-10" >Sign In To Continue</h2>
    
    <hr></hr>

    

    <div className="flex flex-col md:flex-row gap-5">

    <label className={`text-sm font-bold flex-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Email :
            <input className={`rounded w-full border py-1 px-2 font-normal ${darkMode ? "bg-gray-800" : null}`}  style={style2}{...register("email",{
                required:true,
                validate:{
                    matchPattern : (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid Email"
                }
            })}></input>
            {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}
        </label>
    </div>

    <div className="flex flex-col md:flex-row gap-5">

  

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
   
    </div>

    <span className="flex items-center justify-between">
          <span className={`text-sm  ${darkMode ? "text-gray-200" : ""}`}>
            Not Registered?{" "}
            <Link className="underline" to="/signup">
              Create an account here
            </Link>
          </span>

          
        <button type="submit" className={`font-bold w-fit py-1 px-2 hover:rounded-lg hover:bg-blue-500 hover:text-white ${darkMode ? "text-gray-200" : "bg-white text-gray-700 "}`}>
            Login my account
        </button>
        </span>


        

</form>
</div>
    )
};

export default Login;