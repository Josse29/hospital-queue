import React from "react";

const InputText = (props) => {
  const { title, htmlForId, className, ...rest } = props;
  return (
    <>
      <label htmlFor={htmlForId} className="text-2xl block mb-2">
        {title}
      </label>
      <input
        id={htmlForId}
        type="text"
        className={`p-2 w-full border border-slate-300 rounded-md placeholder:text-slate-400 focus:outline-2 ${className}`}
        {...rest}
      />
    </>
  );
};

export default InputText;
