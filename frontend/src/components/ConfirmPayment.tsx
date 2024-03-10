import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

type Props = {
    email:string;
    price:string;
    clientSecret:string;
    id:string;
}

export type ConfirmPaymentData = {
    email:string;
    price:string;
    clientSecret:string;
    id:string;
}

const ConfirmPayment = ({email,price,clientSecret,id}:Props)=>{
  const navigate = useNavigate();
  const {showToast} = useAppContext();
    const stripe = useStripe();
    const elements = useElements();

    console.log(email,price,clientSecret,id);

    const {handleSubmit} = useForm<ConfirmPaymentData>();

    const mutation2 = useMutation(apiClient.confirmPayment,{
        onSuccess:()=>{
          showToast({message:"Payment Confirmed 👌", type:"SUCCESS"});
          navigate("/trading");
        },
        onError:()=>{
          showToast({message:"Payment Failed", type:"ERROR"});
        }
      })

    const onSubmit = handleSubmit( async ()=>{

        if(!stripe || !elements){
            return;
        }
        
        const result = await stripe?.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement) as StripeCardElement
            }
        });
    
        if(result.paymentIntent?.status === "succeeded"){
          console.log(id,email,clientSecret,price);
            mutation2.mutate({email,clientSecret,price,id});
        }
    })

    const {darkMode} = useTheme();
      

    return (
        <form className="flex flex-col w-full pl-8 mr-2" onSubmit={onSubmit}>
        <div className="flex flex-col my-32 gap-4">
          <div className={`text-4xl font-semibold ${darkMode ? "text-gray-200" :" text-gray-700 "}`}>
            Your Payment Summary
          </div>
          <div>
            <label className={`text-xl tracking-tight py-5 ${darkMode ? "text-gray-200" :" text-gray-700 "}`}>
              Email : 
            <input className={`mx-1 px-3 py-2 outline-none ${darkMode ? "bg-gray-800 text-gray-200" :""}`} defaultValue={email}></input>
            </label>

         
          </div>
          <div className={`text-2xl mt-5 font-semibold ${darkMode ? "text-gray-200" : "text-gray-700 "}`}>
            Total Cost : ₹ {price}
          </div>
          <div className={`text-xs ${darkMode ? "text-gray-200":""}`}>
            Inclusive of all taxes and gst charges.
          </div>

          <div className="space-y-2">
            <h1 className={`text-2xl font-semibold ${darkMode ? "text-gray-200":""}`}>Card Details</h1>
            <CardElement
              id="payment-element"
              className={`border rounded-md p-3 text-sm ${darkMode ? "text-gray-200":""}`}
            ></CardElement>
          </div>

      <button
        type="submit"
        className="text-xl text-white bg-blue-500 my-4 py-2 px-3 tracking-tight rounded hover:bg-blue-400"
        >
        Confirm Payment
      </button>
        </div>
    </form>
    )
};

export default ConfirmPayment;