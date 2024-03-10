const basePath = "http://finnhub.io/api/v1";
const headers = new Headers();
headers.append("X-Finnhub-Token" , "cnml68pr01qtghmdtt1gcnml68pr01qtghmdtt20")

export const searchSymbols = async(query : any)=>{
    const url = `${basePath}/search?q=${query}&token=${"cnml68pr01qtghmdtt1gcnml68pr01qtghmdtt20"}`;
    const response = await fetch(url);
    // console.log(response);

    // if(!response.ok){
    //     const message = `An Error Occured : ${response.status}`;
    //     throw new Error(message);
    // };
    const data = await response.json();
    console.log(data);
    return data;
};

export const fetchStockDetails = async(stockSymbol:string)=>{
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${"cnml68pr01qtghmdtt1gcnml68pr01qtghmdtt20"}`;
    const response = await fetch(url);
    // console.log(response);

    if(!response.ok){
        throw new Error(`An Error Occured : ${response.status}`);
    };

    return await response.json();
};


export const fetchQuote = async(stockSymbol:string)=>{
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${"cnml68pr01qtghmdtt1gcnml68pr01qtghmdtt20"}`
    const response = await fetch(url);
    console.log(response);

    if(!response.ok){
        throw new Error(`An Error Occured : ${response.status}`);
    };

    return await response.json();
};

export const fetchHistoricalData = async(stockSymbol:string,resolution:any,from:any,to:any)=>{
    const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${"cnml68pr01qtghmdtt1gcnml68pr01qtghmdtt20"}`;
    const response = await fetch(url);
    console.log(response);

    if(!response.ok){
        throw new Error(`An Error Occured : ${response.status}`);
    };

    return await response.json();

}