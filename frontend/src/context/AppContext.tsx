import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { loadStripe,Stripe } from "@stripe/stripe-js";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type ToastMessage = {
    message : string;
    type : "SUCCESS" | "ERROR";

}
type AppContext = {
    showToast : (toastMessage:ToastMessage)=> void;
    isLoggedIn? : boolean;
    stripePromise:Promise<Stripe | null>;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe("pk_test_51Oh9rESBL00bWoeBE4qeTjSao0na4NCb3TDzdFgnQKLaac5CxZFc6j91pP0vmpLV1MIow2wFA0zKCPZJYMd1onxG00R4LYynOE");

export const AppContextProvider = ({
    children
}:{
    children:React.ReactNode})=>{
        const [toast,setToast] = useState<ToastMessage | undefined>(undefined);
        const {isError} = useQuery("validateToken",apiClient.validateToken,{
            retry:false,
        });

        return (
            <AppContext.Provider 
            value={{
                showToast:(toastMessage)=>{
                    setToast(toastMessage);
                },
                stripePromise,
                isLoggedIn:!isError
            }}>
                {toast && (
                    <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={()=>setToast(undefined)}
                     />
                )}
                {children}
            </AppContext.Provider>
        )
    };

    export const  useAppContext = ()=>{
        const context = useContext(AppContext);
        return context as AppContext;
    }