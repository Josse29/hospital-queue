import React, { useEffect, useState } from "react";
import { Button, InputText, Modal, TextArea } from "../../components";
import { updateScreenAPI } from "../../services/screen";
import Swal from "sweetalert2";
import { BadgePoli } from "../Poli";

const ModalUpdateScreen = (props) => {
  const { dataScreen, updateScreen, setUpdateScreen, getScreen } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ScreenId: "",
    ScreenName: "",
    ScreenPoliSelected: [],
    ScreenInfo: "",
  });
  useEffect(() => {
    if (updateScreen) {
      setLoading(true);
      const { ScreenId, ScreenName, ScreenPoliSelected, ScreenInfo } =
        dataScreen;
      setFormData({
        ScreenId,
        ScreenName,
        ScreenPoliSelected,
        ScreenInfo,
      });
      setLoading(false);
    }
  }, [updateScreen]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { ScreenId, ScreenName, ScreenPoliSelected, ScreenInfo } = formData;
      const ScreenPoliSelectedId = ScreenPoliSelected.map((el) => el._id);
      const successMsg = await updateScreenAPI({
        ScreenId,
        ScreenName,
        ScreenPoliSelectedId,
        ScreenInfo,
      });
      Swal.fire({
        title: successMsg.data.msg || successMsg,
        icon: "success",
      });
      await getScreen();
      setUpdateScreen(false);
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
    <Modal openModal={updateScreen} width="w-[700px]">
      <Modal.Header headerText="Screen" className="bg-teal-500" />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* screen name */}
          <div className="mb-5">
            <InputText
              title="Screen Name :"
              htmlForId="screenName"
              className="focus:outline-teal-500 capitalize"
              placeholder="Ex : Screen Name"
              name="ScreenName"
              value={formData.ScreenName}
              onChange={handleChange}
            />
          </div>
          {/* screen poli */}
          <BadgePoli
            createScreen={updateScreen}
            formData={formData}
            setFormData={setFormData}
            setLoading={setLoading}
          />
          {/* screen information */}
          <div className="mb-5">
            <TextArea
              title="Screen Information :"
              htmlForId="screenInfo"
              className="focus:outline-teal-500"
              placeholder="Ex : more information"
              name="ScreenInfo"
              value={formData.ScreenInfo}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Cancel"
            type="button"
            onClick={() => setUpdateScreen(false)}
            className="bg-slate-500 hover:bg-slate-700 hover:ring-slate-700"
          />
          <Button
            title={loading ? "wait..." : "Done"}
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 hover:ring-teal-700"
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalUpdateScreen;
