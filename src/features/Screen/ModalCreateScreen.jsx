import React, { useState } from "react";
import Modal from "../../components/Modal";
import { ButtonIcon, InputText, TextArea } from "../../components";
import Swal from "sweetalert2";
import { createScreenAPI } from "../../services/screen";
import { BadgePoli } from "../Poli";

const ModalCreateScreen = (props) => {
  const { createScreen, setCreateScreen, getScreen } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ScreenName: "",
    ScreenPoliSelected: [],
    ScreenInfo: "",
  });
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
      const { ScreenName, ScreenPoliSelected, ScreenInfo } = formData;
      const ScreenPoliSelectedId = ScreenPoliSelected.map((el) => el._id);
      const successMsg = await createScreenAPI({
        ScreenName,
        ScreenPoliSelectedId,
        ScreenInfo,
      });
      Swal.fire({
        title: successMsg.data.msg || successMsg,
        icon: "success",
      });
      setFormData({
        ScreenName: "",
        ScreenPoliSelected: [],
        ScreenInfo: "",
      });
      await getScreen();
      setCreateScreen(false);
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
    <Modal openModal={createScreen} width="w-[700px]">
      <Modal.Header headerText="Screen" className="bg-teal-600" />
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
            createScreen={createScreen}
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
          <ButtonIcon
            title="Cancel"
            type="button"
            className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-600"
            onClick={() => setCreateScreen(false)}
          />
          <ButtonIcon
            title={loading ? "wait..." : "Done"}
            className="bg-teal-600 hover:bg-teal-700 hover:ring-teal-700"
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreateScreen;
