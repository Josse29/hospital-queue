import React, { useRef, useState, useEffect } from "react";
import { ButtonIcon, Modal } from "../../components";
import { FaCheck } from "react-icons/fa";
import { speechBell } from "../../utils";
import { FaBell } from "react-icons/fa6";

const ModalTriggerRing = (props) => {
  const { openTriggerRing, setOpenTriggerRing, screenName } = props;
  const [loading, setLoading] = useState(false);
  const soundTimeout = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(soundTimeout.current);
    };
  }, []);
  const checkSound = async () => {
    setLoading(true);
    try {
      await speechBell(`${screenName}`);
      setOpenTriggerRing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          className={`bg-teal-600 hover:bg-teal-700 hover:ring-teal-700 ${
            loading
              ? "opacity-30 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          onClick={checkSound}
          disabled={loading}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTriggerRing;
