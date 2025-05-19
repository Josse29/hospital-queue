import React, { useState } from "react";
import { ButtonIcon } from "../../components";
import { FaDownload } from "react-icons/fa";
import { getPoliQueueIdAPI } from "../../services/poli";
import { exportToExcel } from "../../utils";

const BtnDownloadPoliQueue = ({ poliId }) => {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    try {
      const { data } = await getPoliQueueIdAPI(poliId);
      await exportToExcel(data.PoliQueue, `${data.PoliName}.xlsx`);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <ButtonIcon
      title="Download"
      icon={<FaDownload />}
      className={`bg-teal-500 hover:bg-teal-600 hover:ring-teal-700 ${
        loading ? "opacity-30" : "opacity-100"
      }`}
      onClick={handleDownload}
      disabled={loading ? true : false}
    />
  );
};

export default BtnDownloadPoliQueue;
