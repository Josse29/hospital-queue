import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getScreenIdAPI } from "../services/screen";
import { ModalPrintQueue } from "../features/Poli";
import { printPoliQueueAPI } from "../services/poli";
import { HeaderPage } from "../components";

const TakeQueue = () => {
  const { id } = useParams();
  const [screenName, setScreenName] = useState("");
  const [poliQueue, setPoliQueue] = useState([]);
  const [openPrint, setOpenPrint] = useState(false);
  const [printQueue, setPrintQueue] = useState({});
  const getScreenId = async () => {
    try {
      const response = await getScreenIdAPI(id);
      const { ScreenName, ScreenPoli } = response.data;
      setScreenName(ScreenName);
      setPoliQueue(ScreenPoli);
      // setscreen(response.data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getScreenId();
  }, [id]);
  const handlePrint = async (id) => {
    try {
      const successMsg = await printPoliQueueAPI(id);
      setPrintQueue(successMsg.data || successMsg);
      setOpenPrint(true);
    } catch (error) {
      setOpenPrint(false);
      throw error;
    }
  };
  return (
    <div>
      <HeaderPage screenName={screenName} />
      <div className="flex justify-center py-8">
        {/* existed */}
        {poliQueue.length >= 1 && (
          <div className="grid grid-cols-4 gap-5">
            {poliQueue.map((el) => (
              <div
                key={el._id}
                className={`text-3xl text-white font-bold p-4 rounded-md cursor-pointer w-[180px] h-[160px] flex hover:opacity-70`}
                style={{
                  backgroundColor: `rgba(${el.PoliColor}, 1)`,
                }}
                onClick={() => handlePrint(el._id)}
              >
                <div className="m-auto">{el.PoliName}</div>
              </div>
            ))}
          </div>
        )}
        {/* nonexisted */}
        {poliQueue.length < 1 && (
          <div className="text-4xl m-auto">Poli is Empty...</div>
        )}
        {/* modal print queue */}
        <ModalPrintQueue
          openPrint={openPrint}
          setOpenPrint={setOpenPrint}
          printQueue={printQueue}
        />
      </div>
    </div>
  );
};

export default TakeQueue;
