import { useEffect, useState } from "react";
import { getPoliAPI } from "../../services/poli";
import { FaPlus, FaTimes } from "react-icons/fa";

const BadgePoli = (props) => {
  const { createScreen, formData, setFormData, setLoading } = props;
  const [poliList, setPoliList] = useState([]);
  const getPoliList = async () => {
    setLoading(true);
    try {
      const response = await getPoliAPI();
      setPoliList(response.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleFilterPoli = (el) => {
    const updated = formData.ScreenPoliSelected.filter(
      (item) => item._id !== el._id
    );
    setFormData((prev) => ({
      ...prev,
      ScreenPoliSelected: updated,
    }));
  };
  const handlePushPoli = (el) => {
    const existed = formData.ScreenPoliSelected.find(
      (list) => list._id === el._id
    );
    if (existed) return;
    setFormData((prev) => ({
      ...prev,
      ScreenPoliSelected: [...formData.ScreenPoliSelected, el],
    }));
  };
  useEffect(() => {
    if (createScreen) {
      getPoliList();
    }
  }, [createScreen]);
  return (
    <div className="mb-5">
      <div className="text-2xl mb-1">Screen Poli :</div>
      <div className="flex gap-4">
        {/* selected poli */}
        <div className="w-1/2 border-r-2 border-slate-200">
          <div className="text-lg text-center mb-2">Selected Poli</div>
          {/* existed */}
          <div className="flex flex-wrap gap-2">
            {formData.ScreenPoliSelected.length >= 1 &&
              formData.ScreenPoliSelected.map((el) => (
                <div
                  key={el._id}
                  className="flex items-center gap-3 bg-slate-700 px-3 py-1 w-fit text-white rounded cursor-pointer"
                  onClick={() => handleFilterPoli(el)}
                >
                  <div className="text-lg">{el.PoliName}</div>
                  <FaTimes />
                </div>
              ))}
          </div>
          {/* noNexisted */}
          {formData.ScreenPoliSelected.length < 1 && (
            <div className="text-lg text-center italic">
              Selected Poli Is Empty...
            </div>
          )}
        </div>
        {/* choose one of poli */}
        <div className="w-1/2">
          <div className="text-lg text-center mb-2">Choose One Of Poli :</div>
          {/* existed */}
          <div className="flex flex-wrap gap-2">
            {poliList.length >= 1 &&
              poliList.map((el) => (
                <div
                  key={el._id}
                  className="flex items-center gap-3 bg-teal-600 px-3 py-1 w-fit text-white rounded cursor-pointer"
                  onClick={() => handlePushPoli(el)}
                >
                  <div className="text-lg">{el.PoliName}</div>
                  <FaPlus />
                </div>
              ))}
          </div>
          {/* noNexisted */}
          {poliList.length < 1 && (
            <div className="text-center text-lg italic">Poli is Empty...</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BadgePoli;
