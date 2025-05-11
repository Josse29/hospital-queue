import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "../pages";

const Route1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default Route1;
