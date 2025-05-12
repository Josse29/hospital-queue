import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Label = (props) => {
  const { title, passwordVisible, setPasswordVisible, ...rest } = props;
  return (
    <div className="flex justify-between items-center">
      <label className="text-2xl" {...rest}>
        {title}
      </label>
      <div
        className="hover:cursor-pointer"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? (
          <FaEye className="text-2xl me-4" />
        ) : (
          <FaEyeSlash className="text-2xl me-4" />
        )}
      </div>
    </div>
  );
};
const Input = (props) => {
  const { passwordVisible, className, ...rest } = props;
  return (
    <input
      type={passwordVisible ? "text" : "password"}
      className={`border border-slate-300 px-3 py-2 w-full rounded-md ${className}`}
      placeholder="******"
      {...rest}
    />
  );
};
const InputPassword = (props) => {
  const { className, children } = props;
  return (
    <div className={`flex flex-col gap-2 mb-3 ${className}`}>{children}</div>
  );
};
InputPassword.Label = Label;
InputPassword.Input = Input;
export default InputPassword;
