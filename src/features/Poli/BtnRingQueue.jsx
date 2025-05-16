import React, { useContext } from "react";
import { Button } from "../../components";
import { FaBell } from "react-icons/fa";
import { ringPoliQueue } from "../../services/poli";
import { AllContext } from "../../context/AllProvider";

const BtnRingQueue = (props) => {
  const { getPoliQueue, setLoadingRing } = useContext(AllContext);
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
      const { msg, poli } = response.data;
      await getPoliQueue();
      // console.log(msg);
      // console.log(poli);
    } catch (error) {
      console.error(error.response.data.errMsg || error);
      throw error;
    } finally {
      setLoadingRing(false);
    }
  };
  return (
    <Button
      title={<FaBell />}
      className={`bg-red-500 hover:bg-red-600 hover:ring-red-600 ${
        CallTimes || setLoadingRing >= 3
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }`}
      onClick={handleRing}
      disabled={CallTimes || setLoadingRing >= 3 ? true : false}
    />
  );
};

export default BtnRingQueue;
