import { useTheme } from "../context/ThemeContext";

const Card = ({children}:any)=>{
    const {darkMode} = useTheme();
    return (
        <div className={`w-full h-full rounded-md relative p-8 border-2 bg-gray-100 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}>
            {children}
        </div>
    )
};

export default Card;