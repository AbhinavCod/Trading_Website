import { useContext, useEffect, useState } from "react";
// import { mockHistoricalData } from "../constants/mock";
import { convertUnixTimestampToDate,convertDateToUnixTimestamp,createDate } from "./helpers/date-helper";
import Card from "./Card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import { fetchHistoricalData } from "../api/StockApi";
import StockContext from "../context/StockContext";


export type HistoricalDataType = {
    c: number[];
    h: number[];
    l: number[];
    o: number[];
    s: string;
    t: number[];
    v: number[];
}
export const defaultHistoricalData = {
    c: [],
    h: [],
    l: [],
    o: [],
    s: "",
    t: [],
    v: [],
}


const Chart = ()=>{
    const [data,setData] = useState<HistoricalDataType>(defaultHistoricalData);
    const [filter,setFilter] = useState("1W");
    const stockContext = useContext(StockContext);
    const stockSymbol = stockContext?.stockSymbol;

    useEffect(()=>{
        const getDateRange = ()=>{
            const {days,weeks,months,years} = chartConfig[filter];
            const endDate = new Date();
            const startDate = createDate(endDate, - days, -weeks, -months, -years);

            const startTimeStampUnix = convertDateToUnixTimestamp(startDate);
            const endTimeStampUnix = convertDateToUnixTimestamp(endDate);


            return {startTimeStampUnix,endTimeStampUnix};
        }
        const updateChartData = async()=>{
            try {
                const {startTimeStampUnix,endTimeStampUnix} = getDateRange();
                const resolution = chartConfig[filter].resolution;

                if(stockSymbol){
                    const result = await fetchHistoricalData(stockSymbol,resolution,startTimeStampUnix,endTimeStampUnix);
                    setData((result));
                }

                
            } catch (error) {
                console.log(error);
                setData(defaultHistoricalData);
            }
        }

        updateChartData();
    },[stockSymbol,filter]);
    
    const formatData = (data:any)=>{

        return data.c.map((item:any,index:number)=>{
            return {
                value: item.toFixed(2),
                date: convertUnixTimestampToDate(data.t[index]),
            }
        });
    };


    return (
        <Card>
            <ul className="flex absolute top-2 right-2 z-40">
                {Object.keys(chartConfig).map((item)=>(
                    <li key={item}>
                        <ChartFilter text={item} active={filter === item} onClick={()=> setFilter(item)} />
                    </li>
                ))}
            </ul>
            <ResponsiveContainer>
                <AreaChart data={formatData(data)}
                > <defs>
                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={"rgb(199 210 254)"}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={"rgb(199 210 254)"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
                    <Area type={"monotone"} dataKey={"value"} stroke="#312e81" fillOpacity={1} strokeWidth={0.5}
                    fill="url(#chartColor)" />
                    <Tooltip  />
                    <XAxis dataKey={"date"} />
                    <YAxis domain={["dataMin","dataMax"]} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
};


export default Chart;