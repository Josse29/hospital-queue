import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { deletePoliAPI } from "../../services/poli";
import { ButtonIcon, Modal } from "../../components";
import { FaCheck } from "react-icons/fa6";
import Swal from "sweetalert2";

const DeletePoli = (props) => {
  const { getPoliQueue, data, setOpenPoli, setMethod, method } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    PoliId: "",
    PoliName: "",
  });
  useEffect(() => {
    if (method === "delete") {
      setLoading(true);
      const { PoliId, PoliName } = data;
      setFormData({
        PoliId,
        PoliName,
      });
      setLoading(false);
    }
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { PoliId } = formData;
      const msg = await deletePoliAPI(PoliId);
      Swal.fire({
        title: msg.data.msg || msg,
        icon: "success",
      });
      await getPoliQueue();
      setMethod("read");
      setOpenPoli(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.errMsg || error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Modal.Body>
        <FaExclamationTriangle className="text-8xl mx-auto text-red-500 mb-3" />
        <div className="text-3xl text-center text-red-600 mb-4">
          Are You Sure Want to Delete {formData.PoliName} ?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonIcon
          title="No"
          icon={<FaTimes />}
          onClick={() => setMethod("read")}
          type="button"
          className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-600"
        />
        <ButtonIcon
          title="Yes"
          icon={<FaCheck />}
          type="submit"
          disabled={loading ? true : false}
          className="bg-red-500 hover:bg-red-600 hover:ring-red-600"
        />
      </Modal.Footer>
    </form>
  );
};

export default DeletePoli;
