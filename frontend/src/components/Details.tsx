
import { stockDetailsType } from "../pages/Trading";
import Card from "./Card";
interface detailListType {
    // name:string,
    //     country:string,
    //     currency:string,
    //     exchange:string,
    //     ipo:string,
    //     marketCapitalization:string,
    //     finnhubIndustry: string
    details:stockDetailsType
}

const Details:React.FC<detailListType> = ({ details})=>{

    const detailsList = {
        name:"Name",
        country:"Country",
        currency:"Currency",
        exchange:"Exchange",
        ipo:"IPO Date",
        marketCapitalization:"Market Capitalization",
        finnhubIndustry: "Industry"
    }

    const convertMillionToBillion = (number : number)=>{
        return (number / 1000).toFixed(2);
    }

    return (
        <Card>
            <ul className="w-full h-full flex flex-col justify-between divide-y-1">
                {Object.entries(detailsList).map(([key,value])=>(
                    <li key={key} className="flex-1 flex justify-between items-center">
                        <span>{value}</span>
                        <span>{key === "marketCapitalization" ? `${convertMillionToBillion(parseInt(details.marketCapitalization))}B` : details.marketCapitalization}</span>
                    </li>
                ))}
            </ul>
        </Card>
    )
};

export default Details;