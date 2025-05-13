import React from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
const ListPoli = (props) => {
  const { poliId, poliName, poliCode, poliColor, setMethod, setData } = props;
  return (
    <div className="flex justify-between border-b-2 border-slate-200 pb-3 py-2">
      <div className="flex gap-3">
        <div
          className={`w-[30px] h-[30px] rounded-md`}
          style={{ backgroundColor: `rgb(${poliColor}` }}
        ></div>
        <div className="text-2xl">
          {poliName} - {poliCode}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {/* update */}
        <div
          className="bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded-md cursor-pointer"
          onClick={() => {
            const colorParts = poliColor?.split(",");
            setData({
              PoliId: poliId,
              PoliName: poliName,
              PoliCode: poliCode,
              Red: colorParts[0] || 200,
              Green: colorParts[1] || 200,
              Blue: colorParts[2] || 200,
            });
            setMethod("update");
          }}
        >
          <FaPen className="text-white" />
        </div>
        {/* delete */}
        <div
          className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md cursor-pointer"
          onClick={() => {
            setData({
              PoliId: poliId,
              PoliName: poliName,
            });
            setMethod("delete");
          }}
        >
          <FaTrash className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ListPoli;
