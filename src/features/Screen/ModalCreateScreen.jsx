import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { ButtonIcon, InputText, TextArea } from "../../components";
import { FaPlus, FaTimes } from "react-icons/fa";
import { getPoliAPI } from "../../services/poli";

const ModalCreateScreen = (props) => {
  const { createScreen, setCreateScreen } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ScreenName: "",
    ScreenPoli: [],
    ScreenInfo: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    } catch (error) {
    } finally {
      setLoading(true);
    }
  };
  // selected poli
  const [poliSelected, setPoliSelected] = useState([]);
  // choose one of poli
  const [poliList, setPoliList] = useState([]);
  const getPoliList = async () => {
    try {
      const response = await getPoliAPI();
      setPoliList(response.data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (createScreen) {
      getPoliList();
    }
  }, [createScreen]);
  return (
    <Modal openModal={createScreen} width="w-[590px]">
      <Modal.Header headerText="Screen" className="bg-teal-600" />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* screen name */}
          <div className="mb-5">
            <InputText
              title="Screen Name :"
              htmlForId="screenName"
              className="focus:outline-teal-500"
              placeholder="Ex : Screen Name"
            />
          </div>
          {/* screen poli */}
          <div className="mb-5">
            <div className="text-2xl mb-1">Screen Poli :</div>
            <div className="flex gap-4">
              {/* selected poli */}
              <div className="w-1/2 border-r-2 border-slate-200">
                <div className="text-lg text-center mb-2">Selected Poli</div>
                {/* existed */}
                <div className="flex flex-wrap gap-2">
                  {poliSelected.length >= 1 &&
                    poliSelected.map((el) => (
                      <div
                        className="flex items-center gap-3 bg-slate-700 px-3 py-1 w-fit text-white rounded cursor-pointer"
                        onClick={() => {
                          const updated = poliSelected.filter(
                            (item) => item._id !== el._id
                          );
                          setPoliSelected(updated);
                        }}
                      >
                        <div className="text-lg">{el.PoliName}</div>
                        <FaTimes />
                      </div>
                    ))}
                </div>
                {/* noNexisted */}
                {poliSelected.length < 1 && (
                  <div className="text-lg text-center italic">
                    Selected Poli Is Empty...
                  </div>
                )}
              </div>
              {/* choose one of poli */}
              <div className="w-1/2">
                <div className="text-lg text-center mb-2">
                  Choose One Of Poli :
                </div>
                {/* existed */}
                <div className="flex flex-wrap gap-2">
                  {poliList.length >= 1 &&
                    poliList.map((el) => (
                      <div
                        className="flex items-center gap-3 bg-teal-600 px-3 py-1 w-fit text-white rounded cursor-pointer"
                        onClick={() => setPoliSelected([...poliSelected, el])}
                      >
                        <div className="text-lg">{el.PoliName}</div>
                        <FaPlus />
                      </div>
                    ))}
                </div>
                {/* noNexisted */}
                {poliList.length < 1 && (
                  <div className="text-center text-lg italic">
                    Poli is Empty...
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* screen information */}
          <div className="mb-5">
            <TextArea
              title="Screen Information :"
              htmlForId="screenInfo"
              className="focus:outline-teal-500"
              placeholder="Ex : more information"
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
