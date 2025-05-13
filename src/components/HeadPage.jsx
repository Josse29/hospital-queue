import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { formatDateTime } from "../utils";

const HeadPage = (props) => {
  const { className, icon, page = "Page" } = props;
  const [date, setDate] = useState("");
  useEffect(() => {
    const { dateNow } = formatDateTime();
    setDate(dateNow);
  }, []);
  return (
    <div
      className={`flex justify-between border-l-[18px] py-3 px-4 shadow-md mb-4 ${className}`}
    >
      <div className="flex gap-3 items-center">
        {icon}
        <div className="text-2xl">{page}</div>
      </div>
      <div className="text-xl">{date}</div>
    </div>
  );
};

export default HeadPage;
