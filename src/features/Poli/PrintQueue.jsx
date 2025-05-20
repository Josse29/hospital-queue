import React, { useContext, useEffect, useRef, useState } from "react";
import { printPoliQueueAPI } from "../../services/poli";
import ModalPrintQueue from "./ModalPrintQueue";
import { AllContext } from "../../context/AllProvider";

const PrintQueue = (props) => {
  const { socket } = useContext(AllContext);
  const { el } = props;
  const [openPrint, setOpenPrint] = useState(false);
  const [printQueue, setPrintQueue] = useState({});
  const [loading, setLoading] = useState(false);
  const coolDown = useRef(null);
  useEffect(() => {
    return () => {
      if (coolDown.current) {
        clearTimeout(coolDown.current);
      }
    };
  }, []);
  const handlePrint = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await printPoliQueueAPI(id);
      setPrintQueue(response.data || response);
      socket.emit("poli:print");
      setOpenPrint(true);
    } catch (error) {
      setOpenPrint(false);
      console.error(error);
      throw error;
    } finally {
      coolDown.current = setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
  };
  return (
    <>
      <div
        key={el._id}
        className={`p-4 rounded-md w-[220px] h-[210px] flex ${
          loading
            ? "cursor-not-allowed opacity-55"
            : "cursor-pointer opacity-100 hover:opacity-70"
        }`}
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
