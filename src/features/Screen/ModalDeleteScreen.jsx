import React, { useEffect, useState } from "react";
import { ButtonIcon, Modal } from "../../components";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { deleteScreenAPI } from "../../services/screen";
import Swal from "sweetalert2";

const ModalDeleteScreen = (props) => {
  const { dataScreen, deleteScreen, setDeleteScreen, getScreen } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ScreenId: "",
    ScreenName: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { ScreenId } = formData;
      const successMsg = await deleteScreenAPI(ScreenId);
      Swal.fire({
        title: successMsg.data.msg || successMsg,
        icon: "success",
      });
      await getScreen();
      setDeleteScreen(false);
    } catch (error) {
      Swal.fire({
        title: error.response.data.errMsg || error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (deleteScreen) {
      const { ScreenId, ScreenName } = dataScreen;
      setFormData({
        ScreenId,
        ScreenName,
      });
    }
  }, [deleteScreen]);
  return (
    <Modal openModal={deleteScreen} width="w-[560px]">
      <Modal.Header headerText="Screen" className="bg-red-600" />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <FaExclamationTriangle className="text-9xl text-red-600 mx-auto mb-5" />
          <div className="text-center text-2xl text-red-700">
            Are You Sure Want to Delete - {formData.ScreenName} ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonIcon
            title="No"
            type="button"
            onClick={() => setDeleteScreen(false)}
            icon={<FaTimes />}
            className="bg-slate-600 hover:bg-slate-700 hover:ring-slate-700"
          />
          <ButtonIcon
            title={loading ? "wait..." : "Yes"}
            type="submit"
            icon={<FaCheck />}
            className="bg-red-600 hover:bg-red-700 hover:ring-red-700"
            disabled={loading ? true : false}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalDeleteScreen;
