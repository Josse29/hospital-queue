import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { video } from "../assets";
import { HeaderPage } from "../components";
import { getScreenId1API } from "../services/screen";
import { RunningText } from "../features/Hospital";
import { AllContext } from "../context/AllProvider";

const ScreenId = () => {
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const [queue, setQueue] = useState({
    ScreenName: "",
    ScreenPoli: [],
  });
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
  useEffect(() => {
    getScreenId();
  }, [id]);
  return (
    <div>
      <HeaderPage screenName={queue.ScreenName} />
      <div className="flex justify-center py-8 gap-7">
        <div className="w-[380px] h-[380px] bg-teal-500 rounded-xl text-white flex">
          <div className="m-auto">
            <div className="text-8xl text-center mb-4 font-bold">{count}</div>
            <div className="text-3xl text-center">Poli Gigi</div>
          </div>
        </div>
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
                    <div className="m-auto">
                      <div className="text-white text-4xl mb-2 text-center font-bold">
                        {no.Code}
                      </div>
                      <div className="text-white text-xl text-center">
                        {no.PoliName}
                      </div>
                    </div>
                  </div>
                ))
            )}
        </div>
      </div>
      <RunningText />
    </div>
  );
};

export default ScreenId;
