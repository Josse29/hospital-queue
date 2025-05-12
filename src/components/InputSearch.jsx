import React from "react";
import { FaMagnifyingGlass, FaSistrix } from "react-icons/fa6";

const InputSearch = ({ children }) => {
  return <div className="flex">{children}</div>;
};
const Input = (props) => {
  const { className, ...rest } = props;
  return (
    <input
      type="text"
      className={`px-3 py-2 border border-slate-300 focus:outline-2 placeholder:text-lg ${className}`}
      {...rest}
    />
  );
};
const Button = (props) => {
  const { className } = props;
  return (
    <button className={`px-3 text-white rounded-e-lg ${className}`}>
      <FaMagnifyingGlass className=" text-white text-xl" />
    </button>
  );
};

InputSearch.Input = Input;
InputSearch.Btn = Button;
export default InputSearch;
