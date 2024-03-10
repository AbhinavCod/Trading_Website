import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const {darkMode} = useTheme();
  return (
    <div className={`flex flex-col gap-5 ${darkMode ? "bg-gray-900 border-gray-800" : ""}`}>
      <div>
        <img
          className={`w-fit mx-auto mt-1 rounded ${darkMode ? "border-gray-800 " : ""}`}
          style={{ marginBottom: "6rem", maxHeight: "45vh" }}
          src="https://zerodha.com/static/images/landing.png"
        />
      </div>

      <div className="flex flex-col gap-5">
        <h1 className={`text-6xl font-semibold text-gray-700 tracking-tight text-center ${darkMode ? "text-gray-200" : ""}`}>
          Invest in everything
        </h1>
        <p className={`text-3xl text-gray-700 text-center py-4 ${darkMode ? "text-gray-200" : ""}`}>
          Online platform to invest in stocks,funds,derivatives and more
        </p>
        <Link
          to={"/login"}
          className={`rounded text-white bg-blue-500 w-fit mx-auto my-5 py-4 px-8 text-2xl hover:bg-black ${darkMode ? "text-gray-200" : ""}`}
        >
          Sign-In Now
        </Link>
      </div>

      <div className="grid md:grid-cols-[2fr_2fr] py-16">
        <div>
          <img
            className="ml-1 rounded "
            src="https://zerodha.com/static/images/largest-broker.svg"
          ></img>
        </div>

        <div className="">
          <h1 className={`text-5xl text-gray-700 mx-auto text-nowrap ${darkMode ? "text-gray-200" : ""}`}>
            Largest stocks broker in india
          </h1>
          <p className={`text-2xl text-gray-700 py-10 tracking-tight ${darkMode ? "text-gray-200" : ""}`}>
            1.3+ Crore Zerodha clients contribute to over 15% of all retail
            volumes in india daily by trading and investing in:
          </p>

            <div className="flex gap-8">
                <div className={`text-2xl text-gray-700 ${darkMode ? "text-gray-200" : ""}`}>
                    <ul className="flex flex-col gap-2">
                        <li>• Futures and options</li>
                        <li>• Commodity derivatives</li>
                        <li>• Currency derivatives</li>
                    </ul>
                </div>

                <div className={`text-2xl text-gray-700 ${darkMode ? "text-gray-200" : ""}`}>
                    <ul className="flex flex-col gap-2">
                        <li>• Stocks and IPOS</li>
                        <li>• Direct mutual funds</li>
                        <li>• Bonds and Govt. Securities</li>
                    </ul>
                </div>
            </div>
            
            <p className="py-20 rounded">
                <img src="https://zerodha.com/static/images/press-logos.png" />
            </p>

        </div>
      </div>
    </div>
  );
};

export default Home;
