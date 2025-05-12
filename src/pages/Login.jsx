import React from "react";
import { FormLogin } from "../features/Hospital";
import { LoginImg } from "./../assets";
const Login = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex w-[70%] gap-1">
        <img src={LoginImg} alt="" className="w-[60%]" />
        <div className="w-[40%] m-auto">
          <div className="text-4xl font-extrabold text-teal-600 mb-4">
            Login Page
          </div>
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
