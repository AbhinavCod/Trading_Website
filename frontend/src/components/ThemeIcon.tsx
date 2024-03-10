import { MoonIcon } from "@heroicons/react/solid";
import { useTheme } from "../context/ThemeContext";

const ThemeIcon = ()=>{
    const {darkMode,changeMode} = useTheme();

    return (
        <button className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-40  shadow-lg ${darkMode ? "shadow-gray-800" :"null"}`} 
        onClick={()=> changeMode(darkMode)}>
            <MoonIcon className={`h-6 w-6 cursor-pointer stroke-1 fill-none stroke-neutral-400 ${darkMode ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-neutral-400"}`} />
        </button>
    )
};

export default ThemeIcon;