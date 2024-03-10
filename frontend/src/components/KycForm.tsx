import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useState } from "react";
import Otp from "./Otp";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

export type KycFormData = {
  email: string;
  aadhar: number;
  phone: number;
  pan:number;
};

interface Data {
  fullName?: string;
  aadhar?: number;
  phone?: number;
}

let Data: Data = {};

const KycForm = () => {
  const {showToast} = useAppContext();
  const [otp, setOtp] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const mutation = useMutation(apiClient.otp, {
    onSuccess: () => {

      showToast({message:"OTP SENT",type:"SUCCESS"});
    },
    onError: () => {
      showToast({message:"Failed to sent otp",type:"SUCCESS"});
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KycFormData>();

  const onSubmit = handleSubmit((data) => {
    Data = { ...data };
    mutation.mutate(data);
  });

  const showOtp = () => {
    setOtp(!otp);
  };

  const {darkMode} = useTheme();
  return (
    <>
    <div className=" flex flex-col">

    
      <div className={`flex flex-col gap-13 ${otp ? "hidden" : ""} ${darkMode ? "bg-gray-900" : ""}`}>
        <div className="flex py-4 flex-col">
          <h1 className={`text-6xl  mx-auto ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Fill the KYC form</h1>
          <p className={`text-4xl  py-12 mx-auto ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Enter the following details correctly as per Aadhar
          </p>
        </div>

        <div>
          <form className="px-20 " onSubmit={onSubmit}>
            <div className="py-5">
              <label className={` text-xl font-bold flex-1 mr-5 ${darkMode ? "text-gray-200":"text-gray-700"}`}>
                Email :
                <input
                  className={`rounded w-full border py-1 px-2 font-normal ml-4 ${darkMode ? "bg-gray-800" : ""}`}
                  placeholder="Enter your valid email"
                  style={{ width: "30rem" }}
                  {...register("email", {
                    required: "Email is required",
                  })}
                ></input>
                {errors.email && (
                  <span className="text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div className="py-5">
              <label className={` text-xl font-bold flex-1 mr-5 ${darkMode ? "text-gray-200":"text-gray-700"}`}>
                Aadhar No. :
                <input
                  className={`rounded w-full border py-1 px-2 font-normal ml-4 ${darkMode ? "bg-gray-800" : ""}`}
                  placeholder="Enter 12 digit aadhar no."
                  style={{ width: "30rem" }}
                  title="Please enter 12 digit aadhar no."
                  {...register("aadhar", {
                    required: "Aadhar no. is required",
                  })}
                ></input>
                {errors.aadhar && (
                  <span className="text-red-500">{errors.aadhar.message}</span>
                )}
              </label>
            </div>

            <div className="py-5">
              <label className={` text-xl font-bold flex-1 mr-5 ${darkMode ? "text-gray-200":"text-gray-700"}`}>
                PAN Card No :
                <input
                  className={`rounded w-full border py-1 px-2 font-normal ml-4 ${darkMode ? "bg-gray-800" : ""}`}
                  placeholder="Enter 12 digit aadhar no."
                  style={{ width: "30rem" }}
                  title="Please enter 10 digit PAN no."
                  {...register("pan", {
                    required: "PAN Card no. is required",
                  })}
                ></input>
                {errors.pan && (
                  <span className="text-red-500">{errors.pan.message}</span>
                )}
              </label>
            </div>

            <div className="py-5">
              <label className={` text-xl font-bold flex-1 mr-5 ${darkMode ? "text-gray-200":"text-gray-700"}`}>
                Phone No. :<span className="border py-1 px-2 ml-4">+91</span>
                <input
                  className={`w-full border py-1 px-2 font-normal ${darkMode ? "bg-gray-800" : ""}`}
                  type="tel"
                  placeholder="Enter 10 digit Phone no."
                  style={{ width: "30rem" }}
                  title="Please enter 10 digit aadhar no."
                  {...register("phone", {
                    required: "Phone no. is required",
                  })}
                ></input>
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </label>
            </div>

            <span>
              <input
                type="checkbox"
                onChange={() => {
                  setDisabled(!disabled);
                }}
              ></input>
              <label className={`ml-2 ${darkMode ? "text-gray-200" : ""}`}>
                I agree to the terms and conditions of{" "}
                <span className="text-blue-500">zerodha</span> services.
              </label>
            </span>

            <div className="">
              {disabled === true ? (
                <button
                  type="submit"
                  className="bg-gray-500 text-white py-3 mt-6 mb-1 px-10 text-xl w-fit"
                  disabled
                >
                  Send-otp
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={showOtp}
                  className="bg-gray-500 text-white py-3 mt-6 mb-1 px-10 text-xl w-fit hover:bg-blue-400"
                >
                  Send-otp
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className=" top-0 left-0 w-full h-full flex items-center justify-center">{otp &&  <Otp phone={Data.phone} />}</div>
      </div>
    </>
  );
};

export default KycForm;
