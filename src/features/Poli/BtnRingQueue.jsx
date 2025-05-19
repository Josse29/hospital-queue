import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components";
import { FaBell } from "react-icons/fa";
import { ringPoliQueue } from "../../services/poli";
import { AllContext } from "../../context/AllProvider";

const BtnRingQueue = (props) => {
  const { socket, loadingRing, setLoadingRing } = useContext(AllContext);
  const { poliId, data } = props;
  const { No, Date, Time, CallTimes } = data;
  const handleRing = async () => {
    setLoadingRing(true);
    try {
      const response = await ringPoliQueue({
        Id: poliId,
        No,
        Date,
        Time,
      });
      const { msg } = response.data;
      socket.emit("poli:ring", msg);
    } catch (error) {
      console.error(error.response.data.errMsg || error);
      throw error;
    }
  };
  return (
    <>
      <Button
        title={<FaBell />}
        className={`bg-red-500 hover:bg-red-600 hover:ring-red-600 ${
          CallTimes === 3 || loadingRing
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
        onClick={handleRing}
        disabled={CallTimes === 3 || loadingRing ? true : false}
      />
    </>
  );
};

export default BtnRingQueue;
