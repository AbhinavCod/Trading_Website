
import PaymentForm from "../components/PaymentForm";
import { useTheme } from "../context/ThemeContext";

const Payment = ()=>{
    const {darkMode} = useTheme();
    return (
        <div className={`grid md:grid-cols-[2fr_1fr] gap-5 min-h-screen ${darkMode ? "bg-gray-900" : ""}`}>

            <div className="border-r-4 px-4">
                <h1 className={` text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-400"}`}>One more step ahead</h1>
                <div className="flex justify-between py-4 ">
                    <p className={` text-5xl tracking-tight ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Pay trading account opening fee</p>
                    <p className={`text-green-500 text-5xl tracking-tight mr-4 `}>₹ 200.0</p>
                </div>
                <hr className="mt-6"></hr>

                <p className={` text-xl tracking-tight pt-10 ${darkMode ? "text-gray-200" : "text-gray-500 "}`}>Buy and sell shares, mutual funds, and derivatives on NSE and BSE.</p>

                <div style={{width:"50rem"}}>

                <h1 className={` text-4xl tracking-tight font-semibold mt-8 ${darkMode ? "text-gray-200" :"text-gray-700"}`}>Trust With Confidence</h1>

                <h1 className={`text-2xl font-semibold tracking-tight mt-6 ${darkMode ? "text-gray-200 bg-gray-900" : "text-gray-700"}`}>Customer-first always</h1>
                <p className={` text-xl tracking-tight mt-4 ${darkMode ? "text-gray-200":"text-gray-700"}`}>That's why 1.3+ Crore customers trust Zerodha with ₹ 3.5+ lakh crore worth of equity investments.</p>

                <h1 className={`text-2xl font-semibold tracking-tight mt-6 ${darkMode ? "text-gray-200 bg-gray-900" : "text-gray-700"}`}>No spam and gimmicks</h1>
                <p className={` text-xl tracking-tight mt-4 ${darkMode ? "text-gray-200":"text-gray-700"}`}>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>

                <h1 className={`text-2xl font-semibold tracking-tight mt-6 ${darkMode ? "text-gray-200 bg-gray-900" : "text-gray-700"}`}>The Zerodha universe</h1>
                <p className={` text-xl tracking-tight mt-4 ${darkMode ? "text-gray-200":"text-gray-700"}`}>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                </div>
            </div>

            
            <div className="flex">
                <PaymentForm />
            </div>
            
        </div>
    ) 
};

export default Payment;