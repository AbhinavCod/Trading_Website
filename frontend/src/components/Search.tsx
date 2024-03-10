import { useState } from "react";
// import {mockSearchResults} from "../constants/mock";
import {XIcon,SearchIcon} from "@heroicons/react/solid";
import SearchResults from "./SearchResults";
import { useTheme } from "../context/ThemeContext";
import { searchSymbols } from "../api/StockApi";

const Search = ()=>{
    const [input,setInput] = useState("");
    const [bestMatches,setBestMatches] = useState([]);
    // console.log(mockSearchResults.result);

    const clear = ()=>{
        setInput("");
        setBestMatches([]);
    };

    const {darkMode} = useTheme();
    const updateBestMatches = async ()=>{
       try {
        if(input){
            const searchResults = await searchSymbols(input);
            const result = searchResults.result;
            setBestMatches(result);
        }
       } catch (error) {
        console.log(error);
        setBestMatches([]);
       }

    }
    return (
        <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200 custom-scrollbar"}`}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900" : null}`}
            placeholder="Search stock..."
            onKeyPress={(e)=> {
                if(e.key === "Enter"){
                    updateBestMatches();
                }
            }}></input>

            {input && <button onClick={clear} className="m-1">
                <XIcon className="h-4 w-4 fill-gray-500" />
            </button>}

            <button onClick={updateBestMatches} className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 hover:bg-indigo-400">
                <SearchIcon className="h-4 w-4 fill-gray-100" />
            </button>

            {input && bestMatches.length > 0 ? (
                <SearchResults results={bestMatches} />
            ) : (
                null
            )}
        </div>
    )
};

export default Search;