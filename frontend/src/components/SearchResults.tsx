import { useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import StockContext from "../context/StockContext";

interface SearchResult {    
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string
}

interface SearchResultsProps {
    results: SearchResult[];
  }

const SearchResults: React.FC<SearchResultsProps> = ({results})=>{
    const stockContext = useContext(StockContext);
    const changeStockSymbol = stockContext?.changeStockSymbol;

    const {darkMode} = useTheme();
    console.log(results);
    return (
        <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll   ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark" : "bg-white border-neutral-200"}`}>

            {results.map((result:any)=>(
                <li key={result.symbol} className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200 ${darkMode ? "hover:bg-indigo-600 " : "bg-indigo-200"}` }
                onClick={()=>  changeStockSymbol &&  changeStockSymbol(result.symbol)}>
                    <span>{result.symbol}</span>
                    <span>{result.description}</span>
                </li>
            ))}
        </ul>
    )
};

export default SearchResults;