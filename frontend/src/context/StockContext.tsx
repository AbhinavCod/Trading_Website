import React, { useState } from "react";

export type StockContextType = {
    stockSymbol:string;
    changeStockSymbol:(symbol:string)=> void
}

const StockContext = React.createContext<StockContextType | undefined>(undefined);

export const StockContextProvider = ({children}:{children:React.ReactNode})=>{

    const [stockSymbol,setStockSymbol] = useState("FB");

    const changeStockSymbol = (symbol:string)=>{
        setStockSymbol(symbol);
    };



    return (
    <StockContext.Provider value={{stockSymbol:stockSymbol || "",changeStockSymbol}}>
        {children}
    </StockContext.Provider>
    )
};

// export const useStockContext = ()=>{
//     const context = useContext(StockContext);
//     return context 
// };

export default StockContext;