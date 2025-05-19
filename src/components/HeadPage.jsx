import React, { useEffect, useState } from "react";
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
      className={`flex justify-between border-l-[18px] py-4 px-3 shadow-md mb-6 ${className} bg-white`}
    >
      <div className="flex gap-3 items-center">
        {icon}
        <div className="text-3xl">{page}</div>
      </div>
      <div className="text-2xl">{date}</div>
    </div>
  );
};

export default HeadPage;
