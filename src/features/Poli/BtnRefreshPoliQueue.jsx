import React, { useContext } from "react";
import { Button } from "../../components";
import { FaRotateRight } from "react-icons/fa6";
import { AllContext } from "../../context/AllProvider";

const BtnRefreshPoliQueue = (props) => {
  const { getPoliQueue } = useContext(AllContext);
  const handleRefresh = async () => {
    await getPoliQueue();
  };
  return (
    <Button
      title={<FaRotateRight />}
      className="bg-amber-600 hover:bg-amber-700 hover:ring-amber-700"
      onClick={handleRefresh}
    />
  );
};

export default BtnRefreshPoliQueue;
