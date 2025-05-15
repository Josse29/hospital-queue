import React, { useEffect, useState } from "react";
import { FaLocationPinLock, FaPhone, FaTv } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { Logo } from "../assets";
import { formatDateTime } from "../utils";
const HeaderPage = (props) => {
  const { screenName } = props;
  const [watch, setWatch] = useState({
    Date: "",
    Time: "",
  });
  const updateTime = () => {
    const { dateNow, timeNow } = formatDateTime();
    setWatch({
      Date: dateNow,
      Time: timeNow,
    });
  };
  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [screenName]);
  return (
    <div className="w-full p-4 bg-cyan-700 flex items-center justify-between px-15">
      <div className="flex gap-5 items-center">
        <img src={Logo} alt="" className="w-[50px]" />
        <div>
          <div className="flex gap-4 text-white">
            <div className="text-3xl font-bold mb-1">Hospital Name</div>
            <div className="flex gap-2 items-center">
              <FaTv />
              <div className="text-lg">{screenName}</div>
            </div>
          </div>
          <div className="flex gap-3 text-white text-lg">
            <div className="flex gap-2 items-center">
              <FaPhone />
              <div>0812xxx</div>
            </div>
            <div className="flex gap-2 items-center">
              <FaEnvelope />
              <div>hospital@gmail.com</div>
            </div>
            <div className="flex gap-2 items-center">
              <FaLocationPinLock />
              <div>Medan</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-xl text-white">{watch.Date}</div>
        <div className="text-lg text-white text-right">{watch.Time}</div>
      </div>
    </div>
  );
};

export default HeaderPage;
