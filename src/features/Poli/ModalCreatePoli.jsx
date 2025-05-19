import React, { useState } from "react";
import { Button, InputRange, InputText, Modal } from "../../components";
import { FaFolderPlus } from "react-icons/fa6";
import { createPoliAPI } from "../../services/poli";
import Swal from "sweetalert2";

const ModalCreatePoli = (props) => {
  const { createPoli, setCreatePoli, getPoliQueue, Authorization } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    PoliName: "",
    PoliCode: "",
    Red: 125,
    Green: 0,
    Blue: 255,
  });
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
    try {
      const { PoliName, PoliCode, Red, Green, Blue } = formData;
      const req = {
        PoliName,
        PoliCode,
        PoliColor: `${Red},${Green},${Blue}`,
      };
      const successMsg = await createPoliAPI(req);
      Swal.fire({
        title: successMsg.data.msg || successMsg,
        icon: "success",
      });
      setFormData({
        PoliName: "",
        PoliCode: "",
        Red: 125,
        Green: 0,
        Blue: 255,
      });
      await getPoliQueue();
      setCreatePoli(false);
    } catch (error) {
      Swal.fire({
        title: error.response.data.errMsg || error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={createPoli} width="w-[590px]">
      <Modal.Header
        headerText="Poli"
        icon={<FaFolderPlus />}
        className="bg-indigo-500"
      />
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
            className="bg-red-500 hover:bg-red-600 hover:ring-red-600"
            onClick={() => setCreatePoli(false)}
          />
          <Button
            title={loading ? "wait..." : "Done"}
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 hover:ring-indigo-600"
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreatePoli;
