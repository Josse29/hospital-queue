import React from "react";
import { Button } from "../../components";
import { FaRotateRight } from "react-icons/fa6";
import { getPoliQueueAPI } from "../../services/poli";

const BtnRefreshPoliQueue = (props) => {
  const { setPoliQueue } = props;
  const getPoliQueue = async () => {
    // setLoading(true);
    try {
      const response = await getPoliQueueAPI("");
      setPoliQueue(response.data);
    } catch (error) {
      throw error;
    } finally {
      // setLoading(false);
    }
  };
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
