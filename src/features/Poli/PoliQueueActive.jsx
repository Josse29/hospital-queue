import React, { useEffect, useRef, useState } from "react";

const PoliQueueActive = ({ data }) => {
  const ringTimeOut = useRef(null);
  const [ringActived, setRingActived] = useState(false);
  useEffect(() => {
    clearTimeout(ringTimeOut.current);
    setRingActived(true);
    ringTimeOut.current = setTimeout(() => {
      setRingActived(false);
    }, 1000);
    return () => clearTimeout(ringTimeOut.current);
  }, [data]);
  return (
    <div
      className={`w-[380px] h-[380px] bg-teal-500 rounded-xl text-white flex ${
        ringActived ? "opacity-20" : "opacity-100"
      } transition-all duration-1000`}
    >
      <div className="m-auto">
        <div className="text-8xl text-center mb-4 font-bold">
          {data.QueueNo}
        </div>
        <div className="text-3xl text-center">{data.Poli}</div>
      </div>
    </div>
  );
};

export default PoliQueueActive;
