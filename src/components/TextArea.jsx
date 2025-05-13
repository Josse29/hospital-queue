import React from "react";

const TextArea = (props) => {
  const { title, htmlForId, className, ...rest } = props;
  return (
    <>
      <label htmlFor={htmlForId} className="text-2xl block mb-2">
        {title}
      </label>
      <textarea
        id={htmlForId}
        type="text"
        className={`w-full border border-slate-300 rounded-md focus:border-0 focus:outline-2 placeholder:text-slate-400 ${className} px-3 py-2`}
        {...rest}
      />
    </>
  );
};

export default TextArea;
