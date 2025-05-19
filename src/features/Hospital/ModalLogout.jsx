import React, { useContext, useState } from "react";
import { Modal } from "../../components/";
import { AllContext } from "../../context/AllProvider";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { ButtonIcon } from "../../components";

const ModalLogout = () => {
  const { logout, setLogout } = useContext(AllContext);
  const navigate = useNavigate();
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
          type="button"
          title="Sure"
          icon={<FaCheck />}
          className="bg-red-600 hover:bg-red-700 hover:ring-red-700 hover:cursor-pointer"
          onClick={() => {
            setLogout(false);
            // setUserLogin({});
            // localStorage.removeItem("verifyToken");co
            navigate("/");
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLogout;
