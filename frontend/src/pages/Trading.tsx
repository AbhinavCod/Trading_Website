import { useContext, useEffect, useState } from "react";
import Chart from "../components/Chart";
import Details from "../components/Details";
import Overview from "../components/Overview";
import StockSearchHeader from "../components/StockSearchHeader";
// import { mockCompanyDetails } from "../constants/mock";
import { useTheme } from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../api/StockApi";

export type stockDetailsType = {
    
    country: string,
    currency:string,
    exchange: string,
    ipo: string,
    marketCapitalization: string,
    name:string,
    phone: string,
    shareOutstanding: string,
    ticker: string,
    weburl: string,
    logo: string,
    finnhubIndustry:string
}

export type quoteType = {
    pc:number,
    d:number,
    dp:number,

}

const Trading = ()=>{
    const {darkMode} = useTheme();
    
    const stockContext = useContext(StockContext);
    const stockSymbol = stockContext?.stockSymbol;
   console.log(stockSymbol);

   const [stockDetails,setStockDetails] = useState<stockDetailsType>({
    country: "",
    currency:"",
    exchange: "",
    ipo: "",
    marketCapitalization:"",
    name:"",
    phone: "",
    shareOutstanding: "",
    ticker:"",
    weburl: "",
    logo: "",
    finnhubIndustry:""
   });
   const [quote,setQuote] = useState<quoteType>({pc:0,d:0,dp:0});

   useEffect(()=>{
    const updateStockDetails = async()=>{
        try {
            if(stockSymbol){

                const result = await fetchStockDetails(stockSymbol);
                console.log(result);
                setStockDetails(result);
                console.log(stockDetails);
            }
        } catch (error) {
            console.log(error);
            setStockDetails({
                country: "",
                currency:"",
                exchange: "",
                ipo: "",
                marketCapitalization:"",
                name:"",
                phone: "",
                shareOutstanding: "",
                ticker:"",
                weburl: "",
                logo: "",
                finnhubIndustry:""
               });
        }
    }
    const updateStockOverview = async()=>{
        try {
            if(stockSymbol){

                const result = await fetchQuote(stockSymbol);
                console.log(result)
                setQuote(result);
                console.log(result);
            }
        } catch (error) {
            console.log(error);
            setQuote({pc:0,d:0,dp:0});
        }
    };

    updateStockDetails();
    updateStockOverview();
   },[stockSymbol]);


    return (
        <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6  font-quicksand  p-2 ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}>

            <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
                <StockSearchHeader name={stockDetails.name}/>
            </div>

            <div className="col-span-2 row-span-4">
                <Chart />
            </div>

            <div className="">
                <Overview symbol={stockSymbol} price={quote.pc} change={quote.d} changePercent={quote.dp} currency={stockDetails.currency}/>
            </div>

            <div className="row-span-2 xl:row-span-3">
                <Details details={stockDetails} />
            </div>
            
        </div>
    )
};

export default Trading;