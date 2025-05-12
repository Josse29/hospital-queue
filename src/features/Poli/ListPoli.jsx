import React from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
const ListPoli = (props) => {
  const { poli, setMethod, setData } = props;
  return (
    <>
      {poli.length >= 1 &&
        poli.map((el) => (
          <div
            className="flex justify-between border-b-2 border-slate-200 pb-3 py-2"
            key={el._id}
          >
            <div className="flex gap-3">
              <div
                className={`w-[30px] h-[30px] rounded-md`}
                style={{ backgroundColor: `rgb(${el.PoliColor}` }}
              ></div>
              <div className="text-2xl">
                {el.PoliName} - {el.PoliCode}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div
                className="bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded-md cursor-pointer"
                onClick={() => {
                  const colorParts =
                    el.PoliColor?.split(",").map((v) => parseInt(v)) || [];
                  setData({
                    PoliId: el._id,
                    PoliName: el.PoliName,
                    PoliCode: el.PoliCode,
                    Red: colorParts[0] || 125,
                    Green: colorParts[1] || 0,
                    Blue: colorParts[2] || 255,
                  });
                  setMethod("update");
                }}
              >
                <FaPen className="text-white" />
              </div>
              <div
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md cursor-pointer"
                onClick={() => {
                  setData({
                    PoliId: el._id,
                    PoliName: el.PoliName,
                  });
                  setMethod("delete");
                }}
              >
                <FaTrash className="text-white" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListPoli;
