import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SignOutButton = ()=>{
    const navigate = useNavigate();
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signout,{
        onSuccess:()=>{
            showToast({message:"Logout Suceessfull 👌",type:"SUCCESS"});
            navigate("/");
        },
        onError:()=>{
            showToast({message:"Logout Failed 😒",type:"ERROR"});
        }
    })
    const handleClick = ()=>{
        mutation.mutate();
    }
    const {darkMode} = useTheme();

    return(
        <button
        onClick={handleClick}
        className={`py-1 px-2 text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 text-gray-700"}`}
      >
        Sign out
      </button>
    )
};

export default SignOutButton;