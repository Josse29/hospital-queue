import React from "react";
import { Route, Routes } from "react-router";
import {
  AboutUs,
  Login,
  NotFound,
  QueueRing,
  Screen,
  ScreenSetting,
  TakeQueue,
} from "../pages";

const Route1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/queue-ring" element={<QueueRing />} />
      <Route path="/setting-screen" element={<ScreenSetting />} />
      <Route path="/screen/:id" element={<Screen />} />
      <Route path="/take-queue/:id" element={<TakeQueue />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Route1;
