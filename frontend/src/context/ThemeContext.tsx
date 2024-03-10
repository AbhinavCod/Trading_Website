import React, { useContext, useState } from "react";

type ThemeContext = {
    darkMode : boolean,
    changeMode : (mode:boolean)=> void
}


const ThemeContext = React.createContext<ThemeContext | undefined>(undefined);

export const ThemeContextProvider = ({children}:{children:React.ReactNode})=>{

    const [darkMode,setDarkMode] = useState(false);
    const changeMode = (darkMode:boolean)=>{
        setDarkMode(!darkMode);
    }

    const themeContextValue: ThemeContext = {
        darkMode,
        changeMode,
      };
    
    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    return context as ThemeContext;
};



export default ThemeContext;