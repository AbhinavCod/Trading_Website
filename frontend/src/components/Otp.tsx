import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

type Props = {
    phone:number | undefined;
};
export type OtpData = {
    phone?:number;
    otp:number;
};


const Otp = ({phone}:Props)=>{
    const {showToast} = useAppContext();
    const navigate = useNavigate();
    const mutation = useMutation(apiClient.verifyOtp,{
        onSuccess:()=>{
            showToast({message:"KYC Completed 👌",type:"SUCCESS"});
            navigate("/payment");
        },
        onError:()=>{
            showToast({message:"KYC Failed ",type:"SUCCESS"});
        }
    })
    const {register,handleSubmit,formState:{errors}} = useForm<OtpData>();
    const onSubmit = handleSubmit((data)=>{
        data = {...data,phone}
        mutation.mutate(data);
    })

    const {darkMode} = useTheme();

    return (
        <div className={`flex flex-col gap-5 border px-20 py-20 shadow-2xl  mt-16 ${darkMode ? "bg-gray-900":"bg-slate-100"}`}>
            <div className="text-center">
                <h1 className={` font-bold text-4xl tracking-tight ${darkMode ? "text-gray-200" : "text-gray-700"}`} style={{marginRight:"7rem"}}>Confirm OTP</h1>
                <p className={`text-2xl  py-3 px-2 ml-11 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Send to <span>+91</span>{phone} <Link to={"/kyc"} className="text-blue-500">(change)</Link></p>
            </div>

            <form className="flex flex-col gap-4 mx-auto" onSubmit={onSubmit}>
                <label className={` absolute z-10 bg-white ml-4 leading-3 font-bold mr-5 ${darkMode ? "bg-gray-900 text-gray-500" : "text-gray-700"}`}>
                    Mobile OTP
                </label>
                    <input className="rounded w-full border py-5 mt-2 px-50 font-normal text-2xl "
                     style={{width:"20rem"}}
                     {...register("otp",{required:"OTP is required",
                     min:6
                    })}
                     >
                    </input>{errors.otp && (
                        <span className="text-red-500">{errors.otp.message}</span>
                    )}

                    <p className={`text-xl ${darkMode ? "text-gray-200":""}`}>Didn't recieve otp? Resend via <Link to={"/kyc"} className="text-blue-500">sms</Link></p>

                    <div>
                        <button type="submit" className="text-white text-xl bg-blue-500 py-1 px-3 rounded hover:bg-blue-400">
                            Continue
                        </button>
                    </div>
            </form>
        </div>
    )
};
export default Otp;