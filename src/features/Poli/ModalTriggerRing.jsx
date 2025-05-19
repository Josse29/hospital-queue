import React, { useRef, useState } from "react";
import { ButtonIcon, Modal } from "../../components";
import { FaCheck } from "react-icons/fa";
import { speechBell } from "../../utils";
import { FaBell } from "react-icons/fa6";

const ModalTriggerRing = (props) => {
  const { openTriggerRing, setOpenTriggerRing, screenName } = props;
  const [loading, setLoading] = useState(false);
  const checkSoundTimeOut = useRef(null);
  const checkSound = async () => {
    try {
      clearTimeout(checkSoundTimeOut.current);
      setLoading(true);
      await speechBell(`Rumah Sakit Layar ${screenName} !`);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      clearTimeout.current = setTimeout(() => {
        setOpenTriggerRing(false);
        setLoading(false);
      }, 1000);
    }
  };
  return (
    <Modal openModal={openTriggerRing} width="w-[500px]">
      <Modal.Header headerText="Check Bell" className="bg-teal-600" />
      <Modal.Body>
        <div>
          <FaBell className="text-9xl mx-auto py-5 text-teal-600" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonIcon
          title="Yes"
          icon={<FaCheck />}
          className={`bg-teal-600 hover:bg-teal-700 hover:ring-teal-700 cursor-not-allowed ${
            loading
              ? "opacity-30 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          onClick={checkSound}
          disabled={loading ? true : false}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTriggerRing;
