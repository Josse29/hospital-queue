import React, { useEffect, useState } from "react";
import { Button, InputRange, InputText, Modal } from "../../components";
import { updatePoliAPI } from "../../services/poli";
import Swal from "sweetalert2";

const UpdatePoli = (props) => {
  const { data, setData, setOpenPoli, setMethod, method } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    PoliId: "",
    PoliName: "",
    PoliCode: "",
    PoliColor: "",
    Red: 200,
    Green: 200,
    Blue: 200,
  });
  useEffect(() => {
    if (method === "update") {
      setLoading(true);
      const { PoliId, PoliName, PoliCode, Red, Green, Blue } = data;
      setFormData({
        PoliId,
        PoliName,
        PoliCode,
        Red,
        Green,
        Blue,
      });
      setLoading(false);
    }
  }, [method, data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "Red" || name === "Green" || name === "Blue"
          ? parseInt(value)
          : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { PoliId, PoliName, PoliCode, Red, Green, Blue } = formData;
    try {
      const data = {
        PoliId,
        PoliName,
        PoliCode,
        PoliColor: `${Red},${Green},${Blue}`,
      };
      const msg = await updatePoliAPI(data);
      Swal.fire({
        title: msg.data.msg,
        icon: "success",
      });
      setMethod("read");
      setOpenPoli(false);
    } catch (error) {
      Swal.fire({
        title: error.response.data.errMsg,
        icon: "error",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Modal.Body>
        {/* poli name */}
        <div className="mb-4">
          <InputText
            title="Poli Name : "
            htmlForId="poliName"
            className="focus:outline-indigo-500 capitalize"
            placeholder="ex : poliname"
            onChange={handleChange}
            name="PoliName"
            value={formData.PoliName}
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
            value={formData.PoliCode}
          />
        </div>
        {/* poli color */}
        <div className="mb-4">
          <div className="text-2xl mb-3">Poli Color :</div>
          <div className="flex gap-4">
            {/* preview */}
            <div
              className={`w-[40%] text-3xl flex justify-center items-center uppercase rounded-md text-white font-bold`}
              style={{
                backgroundColor: `rgb(${formData.Red}, ${formData.Green}, ${formData.Blue})`,
              }}
            >
              {formData.PoliCode}
            </div>
            {/* color */}
            <div className="w-[60%]">
              {/* red */}
              <InputRange
                title="Red"
                htmlForId="red"
                className="w-full accent-red-500"
                min={0}
                max={200}
                onChange={handleChange}
                name="Red"
                value={formData.Red}
              />
              {/* Green */}
              <InputRange
                title="Green"
                htmlForId="green"
                className="w-full accent-green-500"
                min={0}
                max={200}
                onChange={handleChange}
                name="Green"
                value={formData.Green}
              />
              {/* Blue */}
              <InputRange
                title="Blue"
                htmlForId="blue"
                className="w-full accent-blue-500"
                min={0}
                max={200}
                onChange={handleChange}
                name="Blue"
                value={formData.Blue}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          title="Cancel"
          type="button"
          onClick={() => setMethod("read")}
          className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-600"
        />
        <Button
          title="Done"
          type="submit"
          disabled={loading ? true : false}
          className="bg-sky-500 hover:bg-sky-600 hover:ring-sky-600"
        />
      </Modal.Footer>
    </form>
  );
};

export default UpdatePoli;
