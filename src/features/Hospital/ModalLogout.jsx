import React, { useContext, useState } from "react";
import { Modal } from "../../components/";
import { AllContext } from "../../context/AllProvider";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { ButtonIcon } from "../../components";
import { logoutAPI } from "../../services/hospital";

const ModalLogout = () => {
  const { logout, setLogout, loginId, setLoginId } = useContext(AllContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAPI(loginId);
      setLoginId(null);
      setLogout(false);
      localStorage.removeItem("verifyToken");
      navigate("/");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal openModal={logout} width="w-[550px]">
      <Modal.Header headerText="Logout" className="bg-red-500 font-bold" />
      <Modal.Body>
        <FaExclamationTriangle className="text-8xl text-red-500 mx-auto mb-5" />
        <div className="text-3xl font-bold text-center mb-3">
          Are You Sure Want to Logout ?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonIcon
          type="button"
          title="No"
          icon={<FaTimes />}
          className="bg-slate-500 hover:bg-slate-700 hover:ring-slate-700 hover:cursor-pointer"
          onClick={() => setLogout(false)}
        />
        <ButtonIcon
          type="submit"
          title="Sure"
          icon={<FaCheck />}
          disabled={loading ? true : false}
          className={`bg-red-600 hover:bg-red-700 hover:ring-red-700 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          onClick={handleLogout}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLogout;
