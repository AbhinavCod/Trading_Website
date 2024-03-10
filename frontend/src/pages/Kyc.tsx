import KycForm from "../components/KycForm";
import { useTheme } from "../context/ThemeContext";
import image from "/images/detail.jpg";

const Kyc = ()=>{

    const {darkMode} = useTheme();

    return (
        <>
        <div>
            <h1 className={`max-auto  text-center text-3xl ${darkMode ? "text-gray-200 bg-gray-900" : "text-gray-700"}`}>You are one step ahead, complete your kyc for opening your first demat account.</h1>
            <h1 className={`max-auto text-center text-2xl py-4 ${darkMode ? "text-gray-200 bg-gray-900" :" text-gray-700" }`}>Please Enter your details as per your aadhaar card number.</h1>
        </div>
        
        <div className="grid grid-cols-[1.5fr_2fr]">
            <div className={`${darkMode ? "bg-gray-900" : ""}`}>
                
                <div className="border-r-4">
                    <img className={`${darkMode ? "bg-gray-900 ml-1" : ""}`} style={{maxHeight:"70vh"}} src={image}></img>
                </div>
            </div>

            <div>
                <KycForm />
            </div>

        </div>
        </>
    )
};

export default Kyc;