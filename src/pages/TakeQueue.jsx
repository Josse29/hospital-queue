import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getScreenIdAPI } from "../services/screen";
import { PrintQueue } from "../features/Poli";
import { HeaderPage } from "../components";

const TakeQueue = () => {
  const { id } = useParams();
  const [screenName, setScreenName] = useState("");
  const [poliQueue, setPoliQueue] = useState([]);
  const getScreenId = async () => {
    try {
      const response = await getScreenIdAPI(id);
      const { ScreenName, ScreenPoli } = response.data;
      setScreenName(ScreenName);
      setPoliQueue(ScreenPoli);
      // setscreen(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    getScreenId();
  }, [id]);
  return (
    <div>
      <HeaderPage screenName={screenName} />
      <div className="text-center text-5xl my-10">Print Queue</div>
      <div className="flex justify-center">
        {/* existed */}
        {poliQueue.length >= 1 && (
          <div className="grid grid-cols-4 gap-5">
            {poliQueue.map((el) => (
              <PrintQueue key={el._id} el={el} />
            ))}
          </div>
        )}
        {/* nonexisted */}
        {poliQueue.length < 1 && (
          <div className="text-4xl m-auto">Poli is Empty...</div>
        )}
      </div>
    </div>
  );
};

export default TakeQueue;
