import { ConfirmPaymentData } from "./components/ConfirmPayment";
import { KycFormData } from "./components/KycForm";
import { OtpData } from "./components/Otp";
import { PaymentFormType } from "./components/PaymentForm";
import { LoginFormData } from "./pages/Login";
import { SignUpData } from "./pages/SignUpForm";

export type PaymentIntentResponse = {
    paymentIntentId : string;
    clientSecret : string;
    price : number;
}


export const signup = async(formData:SignUpData)=>{
    const response = await fetch("/api/user/signup",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type" : "application/json",
        },
        body:JSON.stringify(formData),
    });

    const body = await response.json();

    if(!response.ok){
        throw new Error(body.message);
    };

    return body;
};

export const login = async (formData:LoginFormData)=>{
    const response = await fetch("/api/auth/login",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });

    const body = await response.json();
    if(!response.ok){
        throw new Error("Error logging in");
    };

    return body;
}

export const validateToken = async ()=>{
    const response  = await fetch("/api/auth/validate-token",{
        credentials:"include",
    });

    const body = await response.json();
    if(!response.ok){
        throw new Error("Token Invalid");
    };
    return body;
}


export const signout = async ()=>{
    console.log("hello");
    const response = await fetch("/api/auth/logout",{
        method:"POST",
        credentials:"include",
    });

    if(!response.ok){
        throw new Error("Logout Failed");
    };
}

export const otp = async(formData:KycFormData)=>{
    const response = await fetch("/api/twilio/send-otp",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });

    const body = await response.json();
    console.log(body);

    if(!response.ok){
        throw new Error(body.message);
    };

    return body;
};

export const verifyOtp = async(formData:OtpData)=>{
    console.log(formData);
    const response = await fetch("/api/twilio/verify-otp",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });

    const body = await response.json();

    if(!response.ok){
        throw new Error(body.message);
    };

    return body;
};

export const createPaymentIntent = async(formData:PaymentFormType): Promise<PaymentIntentResponse> =>{
    const response = await fetch("/api/stripe/payment-intent",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });

    const body = response.json();
    if(!response.ok){
        throw new Error("Error fetching payment intent");
    };

    return body;
};

export const confirmPayment = async (formData:ConfirmPaymentData)=>{
    console.log(formData);
    const response = await fetch("/api/stripe/confirm-payment",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });

    const body = await response.json();
    if(!response.ok){
        throw new Error("Error confirm payment");
    };

    return body;

}

export const fetchStockData = async(symbol : any)=>{
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=HAD19EDS9OIISEFO`);

    if(!response.ok){
        throw new Error("Error fetching stock data");
    }
    const data = response.json();
    return data;
}