import React, { useEffect } from "react";
import { InputRange, InputText } from "../../components";

const UpdatePoli = (props) => {
  const { data, setData } = props;
  const { PoliId, PoliName, PoliCode, PoliColor, Red, Green, Blue } = data;
  useEffect(() => {
    setData({
      PoliId,
      PoliName,
      PoliCode,
      Red,
      Green,
      Blue,
    });
  }, [PoliId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]:
        name === "Red" || name === "Green" || name === "Blue"
          ? parseInt(value)
          : value,
    }));
  };
  return (
    <div>
      {/* poli name */}
      <div className="mb-4">
        <InputText
          title="Poli Name : "
          htmlForId="poliName"
          className="focus:outline-indigo-500 capitalize"
          placeholder="ex : poliname"
          onChange={handleChange}
          name="PoliName"
          value={PoliName}
        />
      </div>
      {/* poli code */}
      <div className="mb-4">
        <InputText
          title="Poli Code : "
          htmlForId="poliCode"
          className="focus:outline-indigo-500 uppercase"
          placeholder="ex : P = 1"
          name="PoliCode"
          onChange={handleChange}
          value={PoliCode}
        />
      </div>
      {/* poli color */}
      <div className="mb-4">
        <div className="text-2xl mb-3">Poli Color :</div>
        <div className="flex gap-4">
          <div
            className={`w-[40%] text-3xl flex justify-center items-center uppercase rounded-md text-white font-bold`}
            style={{
              backgroundColor: `rgb(${Red}, ${Green}, ${Blue})`,
            }}
          >
            {PoliCode}
          </div>
          {/* color */}
          <div className="w-[60%]">
            {/* red */}
            <InputRange
              title="Red"
              htmlForId="red"
              className="w-full accent-red-500"
              min={0}
              max={255}
              onChange={handleChange}
              name="Red"
              value={data.Red}
            />
            {/* Green */}
            <InputRange
              title="Green"
              htmlForId="green"
              className="w-full accent-green-500"
              min={0}
              max={255}
              onChange={handleChange}
              name="Green"
              value={data.Green}
            />
            {/* Blue */}
            <InputRange
              title="Blue"
              htmlForId="blue"
              className="w-full accent-blue-500"
              min={0}
              max={255}
              onChange={handleChange}
              name="Blue"
              value={data.Blue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePoli;
