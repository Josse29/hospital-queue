import React, { useState } from "react";
import { NavigationContainer } from "./../navigation";
import { FaAngleDown, FaBell, FaFolderPlus, FaPlus } from "react-icons/fa6";
import { Button, ButtonIcon, Card, HeadPage, InputSearch } from "../components";
import { ModalPoli } from "../features/Poli";
import ModalCreatePoli from "../features/Poli/ModalCreatePoli";

const QueueRing = () => {
  const [openPoli, setOpenPoli] = useState(false);
  const [createPoli, setCreatePoli] = useState(false);
  return (
    <NavigationContainer>
      <HeadPage icon={<FaBell className="text-3xl" />} page="Queue Ring" />
      <div className="shadow-md py-3 px-4">
        <div className="flex justify-end gap-4">
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
          <InputSearch>
            <InputSearch.Input
              placeholder="Input Keyword Poli...."
              className="focus:outline-sky-600 w-[350px]"
            />
            <InputSearch.Btn className="bg-sky-500 hover:bg-sky-600 hover:cursor-pointer" />
          </InputSearch>
        </div>
      </div>
      {/* modal poli */}
      <ModalPoli openPoli={openPoli} setOpenPoli={setOpenPoli} />
      <ModalCreatePoli createPoli={createPoli} setCreatePoli={setCreatePoli} />
    </NavigationContainer>
  );
};
export default QueueRing;
