import React, { useContext, useState } from "react";
import { printPoliQueueAPI } from "../../services/poli";
import ModalPrintQueue from "./ModalPrintQueue";
import { AllContext } from "../../context/AllProvider";

const PrintQueue = (props) => {
  const { socket } = useContext(AllContext);
  const { el } = props;
  const [openPrint, setOpenPrint] = useState(false);
  const [printQueue, setPrintQueue] = useState({});
  const handlePrint = async (id) => {
    try {
      const response = await printPoliQueueAPI(id);
      const { newQueueData, updatedPoli } = response.data;
      setPrintQueue(newQueueData || response);
      socket.emit("poliQueueUpdated", updatedPoli);
      setOpenPrint(true);
    } catch (error) {
      setOpenPrint(false);
      console.error(error);
      throw error;
    }
  };
  return (
    <>
      <div
        key={el._id}
        className={`p-4 rounded-md cursor-pointer w-[220px] h-[210px] flex hover:opacity-70`}
        style={{
          backgroundColor: `rgb(${el.PoliColor})`,
        }}
        onClick={() => handlePrint(el._id)}
      >
        <div className="m-auto truncate hover:text-wrap text-3xl text-white font-bold">
          {el.PoliName}
        </div>
      </div>
      <ModalPrintQueue
        openPrint={openPrint}
        setOpenPrint={setOpenPrint}
        printQueue={printQueue}
      />
    </>
  );
};

export default PrintQueue;
