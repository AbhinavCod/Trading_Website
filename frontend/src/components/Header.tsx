import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";
import ThemeIcon from "./ThemeIcon";
import { useTheme } from "../context/ThemeContext";

const Header = ()=>{
    const {isLoggedIn} = useAppContext();
    const {darkMode} = useTheme();

    return (
        <div className={` justify-between rounded-md flex mt-2  py-8 px-5 ${darkMode ? "bg-gray-900 text-gray-300" :"bg-gray-200" }`}>
            <div className="mx-10">
                <img src="https://zerodha.com/static/images/logo.svg" className="h-6" />
            </div>

            <div className="mx-20 gap-8 flex ">
                {isLoggedIn === true ? (
                    
                    <>
                    <Link to={"/"} className={`py-1 px-2 bg-gray-200 rounded-sm text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 border-neutral-200"}`}>Home</Link>
                    <Link to={"/signup"} className={`py-1 px-2 bg-gray-200 rounded-sm text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 border-neutral-200"}`}>Sign-Up</Link>
                    <Link to={"/"} className={`py-1 px-2 bg-gray-200 rounded-sm text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 border-neutral-200"}`}>Products</Link>
                    <Link to={"/"} className={`py-1 px-2 bg-gray-200 rounded-sm text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 border-neutral-200"}`}>Pricing</Link>
                    <Link to={"/"} className={`py-1 px-2 bg-gray-200 rounded-sm text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 border-neutral-200"}`}>Contact-Us</Link>  
                  <SignOutButton />
                  </>
                ):(  
                    <>
                    <Link to={"/"} className={`py-1 px-2 bg-gray-200 rounded-sm text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 border-neutral-200"}`}>Home</Link>
                    <Link to={"/signup"} className={`py-1 px-2 bg-gray-200 rounded-sm text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 border-neutral-200"}`}>Sign-Up</Link>
                    <Link to={"/"} className={`py-1 px-2 bg-gray-200 rounded-sm text-2xl  hover:text-blue-500 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-gray-200 border-neutral-200"}`}>Contact-Us</Link>
                    </>
                )}
                
                <div>
                    <ThemeIcon />
                </div>
            </div>
        </div>
    )
};

export default Header;