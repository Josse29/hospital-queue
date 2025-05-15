import React, { useState } from "react";
import { Button } from "../../components";
import { FaBell } from "react-icons/fa";
import { ringPoliQueue } from "../../services/poli";

const BtnRingQueue = (props) => {
  const { poliId, data } = props;
  const { No, Date, Time, CallTimes } = data;
  const [loading, setLoading] = useState(false);
  const handleRing = async () => {
    setLoading(true);
    try {
      const response = await ringPoliQueue({
        Id: poliId,
        No,
        Date,
        Time,
      });
      console.log(response);
    } catch (error) {
      console.error(error.response.data.errMsg || error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      title={<FaBell />}
      className={`bg-red-500 hover:bg-red-600 hover:ring-red-600 ${
        CallTimes || loading >= 3
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }`}
      onClick={handleRing}
      disabled={CallTimes || loading >= 3 ? true : false}
    />
  );
};

export default BtnRingQueue;
