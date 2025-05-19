import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { video } from "../assets";
import { HeaderPage } from "../components";
import { getScreenId1API } from "../services/screen";
import { RunningText } from "../features/Hospital";
import { ModalTriggerRing, PoliQueueActive } from "../features/Poli";
import { AllContext } from "../context/AllProvider";
import { speechBell } from "../utils";

const ScreenId = () => {
  const { socket } = useContext(AllContext);
  const { id } = useParams();
  const [queue, setQueue] = useState({
    ScreenName: "",
    ScreenPoli: [],
  });
  const [queueActived, setQueueActived] = useState({
    Poli: "",
    QueueNo: "",
  });
  const [openTriggerRing, setOpenTriggerRing] = useState(true);
  const getScreenId = async () => {
    try {
      const { data } = await getScreenId1API(id);
      setQueue(() => ({
        ScreenName: data.ScreenName,
        ScreenPoli: data.ScreenPoli,
      }));
    } catch (error) {
      throw error;
    }
  };
  // first component
  useEffect(() => {
    setOpenTriggerRing(true);
    getScreenId();
  }, [id]);
  // trigger socket
  useEffect(() => {
    socket.on("poli:ring", async (activedNo) => {
      try {
        await getScreenId();
        const words = activedNo.split(" ");
        const keIndex = words.indexOf("ke");
        setQueueActived({
          Poli: words.slice(keIndex + 1).join(" "),
          QueueNo: activedNo.split(" ")[2],
        });
        await speechBell(activedNo);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        socket.emit("poliUpdated:ring");
      }
    });
    return () => {
      socket.off("poli:ring");
    };
  }, []);
  return (
    <div>
      <HeaderPage screenName={queue.ScreenName} />
      <div className="flex justify-center py-8 gap-7">
        <PoliQueueActive data={queueActived} />
        <video className="h-[380px]" autoPlay muted loop>
          <source src={video} type="video/webm" />
        </video>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-4 w-[1090px]">
          {queue.ScreenPoli.length >= 1 &&
            queue.ScreenPoli.map(
              (el, i) =>
                queue.ScreenPoli[i].PoliQueue.length >= 1 &&
                queue.ScreenPoli[i].PoliQueue.map((no) => (
                  <div
                    key={el._id}
                    className="bg-teal-700 flex h-[150px] w-full rounded-md"
                    style={{ backgroundColor: `rgb(${el.PoliColor})` }}
                  >
                    <div className="m-auto w-full p-2">
                      <div className="text-white text-4xl mb-2 text-center font-bold truncate hover:text-wrap">
                        {no.Code}
                      </div>
                      <div className="text-white text-xl text-center truncate hover:text-wrap">
                        {no.PoliName}
                      </div>
                    </div>
                  </div>
                ))
            )}
        </div>
      </div>
      <RunningText />
      <ModalTriggerRing
        openTriggerRing={openTriggerRing}
        setOpenTriggerRing={setOpenTriggerRing}
        screenName={queue.ScreenName}
      />
    </div>
  );
};

export default ScreenId;
