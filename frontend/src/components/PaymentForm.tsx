import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { Elements} from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";
import { PaymentIntentResponse } from "../api-client";
import { useState } from "react";
import ConfirmPayment from "./ConfirmPayment";

export type PaymentFormType = {
  email: string;
  price: number;
};

const PaymentForm = () => {
   const {showToast} = useAppContext();
  const { stripePromise } = useAppContext();

  const [email, setEmail] = useState("");
  const [price, setPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [id, setId] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormType>();
  let paymentIntentData: PaymentIntentResponse = {
    paymentIntentId: "",
    clientSecret: "",
    price: 0,
  };

  const mutation = useMutation(apiClient.createPaymentIntent, {
    onSuccess: (data) => {
      showToast({message:"Payment Intent Created",type:"SUCCESS"});
      paymentIntentData = { ...data };
      setId(paymentIntentData.paymentIntentId);
      setClientSecret(paymentIntentData.clientSecret);
      setPrice(paymentIntentData.price);
    },
    onError: () => {
      showToast({message:"Payment Intent Failed",type:"SUCCESS"});
    },
  });


 

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <>

      {paymentIntentData && id ? (

              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: clientSecret,
                }}
              >

    <ConfirmPayment  id={id} email={email} clientSecret={clientSecret} price={price.toString()} />
         
        </Elements>

          
      ) : (
        <div className="border rounded shadow-2xl bg-gray-200 h-fit mt-28 ml-12 mr-1">
        <h1
            className="text-4xl text-gray-700 font-semibold py-8 px-6 mx-auto"
            style={{ marginRight: "-7rem" }}
        >
            Payment through card 💳
        </h1>

        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="py-3 px-3 mx-4 my-2 border rounded">
            <label className="text-xl text-gray-700 tracking-tight py-5 ">
                Email :
                <input
                placeholder="Enter email id"
                className="mx-1 px-3 py-2 outline-none"
                {...register("email", { required: "Email is required" })}
                onChange={(e)=> setEmail(e.target.value)}
                ></input>
                {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            </div>

            <div className="py-3 px-3 mx-4 my-2 border rounded">
            <label className="text-xl text-gray-700 tracking-tight py-5 ">
                Amount :
                <input
                placeholder="Minimum ₹ 200.0"
                className="mx-1 px-3 py-2 outline-none"
                {...register("price", {
                    required: "Amount must not be less than ₹ 200",
                })}
                onChange={(e)=> setPrice(parseInt(e.target.value))}
                ></input>
                {errors.price && (
                <span className="text-red-500">{errors.price.message}</span>
                )}
            </label>
            </div>

        
            
            <span className="py-3 px-3 mx-4 ">
                <input type="checkbox" className="mr-2"></input>
                <span>
                I agree to the terms and conditons and{" "}
                <span className="text-blue-500">confirm</span> the payment. I
                claim that the information provided by me is correct as per my
                Aadhar Card and Financial records. Account opening fees is not
                refundable.
                </span>

                <button
                type="submit"
                className="text-xl text-white bg-blue-500 my-4 py-2 px-3 tracking-tight rounded hover:bg-blue-400"
                >
                Create Payment Intent
                </button>
            </span>
        </form>
        </div>

      )}


    </>
  );
};

export default PaymentForm;
