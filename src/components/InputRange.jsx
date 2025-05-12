import React from "react";

const InputRange = (props) => {
  const { title, htmlForId, className, ...rest } = props;
  return (
    <>
      <label htmlFor={htmlForId} className="text-xl">
        {title} :
      </label>
      <input id={htmlForId} type="range" className={`${className}`} {...rest} />
    </>
  );
};

export default InputRange;
