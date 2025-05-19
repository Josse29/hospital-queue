import React, { useContext, useEffect, useState } from "react";
import { FaLocationPinLock, FaPhone, FaTv } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { Logo } from "../assets";
import { formatDateTime } from "../utils";
import { AllContext } from "../context/AllProvider";
const HeaderPage = (props) => {
  const { hospital, getHospital1 } = useContext(AllContext);
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
    getHospital1();
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [screenName]);
  return (
    <div className="w-full p-4 bg-cyan-700 flex items-center justify-between px-15">
      <div className="flex gap-5 items-center">
        <img src={hospital.HospitalLogo || Logo} alt="" className="w-[50px]" />
        <div>
          <div className="flex gap-4 text-white">
            <div className="text-3xl font-bold mb-1">
              {hospital.HospitalName}
            </div>
            <div className="flex gap-2 items-center">
              <FaTv />
              <div className="text-lg">{screenName}</div>
            </div>
          </div>
          <div className="flex gap-3 text-white text-lg">
            <div className="flex gap-2 items-center">
              <FaPhone />
              <div>{hospital.HospitalPhone}</div>
            </div>
            <div className="flex gap-2 items-center">
              <FaEnvelope />
              <div>{hospital.HospitalEmail}</div>
            </div>
            <div className="flex gap-2 items-center">
              <FaLocationPinLock />
              <div>{hospital.HospitalAddress}</div>
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
