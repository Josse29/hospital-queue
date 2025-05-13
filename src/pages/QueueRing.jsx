import { useEffect, useState } from "react";
import { NavigationContainer } from "./../navigation";
import { FaAngleDown, FaBell, FaFolderPlus } from "react-icons/fa6";
import { ButtonIcon, HeadPage } from "../components";
import { CardPoli, ModalPoli, SearchPoli } from "../features/Poli";
import ModalCreatePoli from "../features/Poli/ModalCreatePoli";
import { getPoliAPI } from "../services/poli";

const QueueRing = () => {
  const [openPoli, setOpenPoli] = useState(false);
  const [createPoli, setCreatePoli] = useState(false);
  const [poli, setPoli] = useState([]);
  const getPoli = async () => {
    // setLoading(true);
    try {
      const response = await getPoliAPI();
      console.log(response.data);
      setPoli(response.data);
    } catch (error) {
      throw error;
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getPoli();
  }, []);
  return (
    <NavigationContainer>
      <HeadPage
        className="border-teal-400"
        icon={<FaBell className="text-3xl" />}
        page="Queue Ring"
      />
      <div className="shadow-md py-3 px-4">
        {/* listpoli, createpoli, searchpoli */}
        <div className="flex justify-end gap-4 mb-5">
          {/* modal poli */}
          <ButtonIcon
            title="List Poli"
            icon={<FaAngleDown className="text-white" />}
            className="bg-sky-600 hover:bg-sky-700 hover:ring-sky-700"
            onClick={() => setOpenPoli(true)}
          />
          {/* create poli */}
          <ButtonIcon
            title="Add Poli"
            icon={<FaFolderPlus className="text-white" />}
            className="bg-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
            onClick={() => setCreatePoli(true)}
          />
          {/* search */}
          <SearchPoli className="w-[400px]" />
        </div>
        {/* card, table, queueRing */}
        {poli.map((el) => (
          <CardPoli
            poliName={el.PoliName}
            poliQueue={el.PoliQueue}
            poliColor={el.PoliColor}
          />
        ))}
      </div>
      {/* modal poli */}
      <ModalPoli openPoli={openPoli} setOpenPoli={setOpenPoli} />
      <ModalCreatePoli createPoli={createPoli} setCreatePoli={setCreatePoli} />
    </NavigationContainer>
  );
};
export default QueueRing;
