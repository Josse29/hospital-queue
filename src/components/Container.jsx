import React from "react";

const Container = ({ children }) => {
  return (
    <div className="shadow-md p-6 bg-white overflow-x-auto">{children}</div>
  );
};

export default Container;
