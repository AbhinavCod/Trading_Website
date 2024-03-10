import Search from "../components/Search";


const StockSearchHeader = ({name}:{name:string})=>{

    return (
        <div >
            <h1 className="text-5xl">{name}</h1>
            <Search />
        </div>
    )
};

export default StockSearchHeader;