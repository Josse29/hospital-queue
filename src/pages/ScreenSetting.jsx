import React, { useEffect, useState } from "react";
import { NavigationContainer } from "../navigation";
import { ButtonIcon, Container, HeadPage } from "../components";
import { FaTv } from "react-icons/fa6";
import { FaPlusSquare } from "react-icons/fa";
import {
  BtnRefreshScreen,
  ModalCreateScreen,
  ModalDeleteScreen,
  ModalUpdateScreen,
  SearchScreen,
  TableScreen,
} from "../features/Screen";
import { getScreenAPI } from "../services/screen";

const ScreenSetting = () => {
  const [createScreen, setCreateScreen] = useState(false);
  const [dataScreen, setDataScreen] = useState({
    ScreenId: "",
    ScreenName: "",
    ScreenPoliSelected: [],
  });
  const [screen, setScreen] = useState([]);
  const [updateScreen, setUpdateScreen] = useState(false);
  const [deleteScreen, setDeleteScreen] = useState(false);
  const getScreen = async () => {
    try {
      const response = await getScreenAPI();
      setScreen(response.data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getScreen();
  }, []);
  return (
    <NavigationContainer>
      <HeadPage
        className="border-teal-400"
        icon={<FaTv className="text-3xl" />}
        page="Screen Setting"
      />
      <Container>
        {/* section first create, search. total */}
        <div className="flex justify-between items-center gap-3 mb-5">
          <div className="flex gap-4">
            {/* refresh */}
            <BtnRefreshScreen setScreen={setScreen} />
            {/* create screen */}
            <ButtonIcon
              title="Screen"
              icon={<FaPlusSquare />}
              className="bg-teal-600 hover:bg-teal-700 hover:ring-teal-700"
              onClick={() => setCreateScreen(true)}
            />
            {/* search  screen */}
            <SearchScreen setScreen={setScreen} />
          </div>
          <div className="text-xl">Total Screen : {screen.length}</div>
        </div>
        {/* section second table */}
        <div className="mb-3">
          <TableScreen
            screen={screen}
            setDataScreen={setDataScreen}
            setDeleteScreen={setDeleteScreen}
            setUpdateScreen={setUpdateScreen}
          />
        </div>
      </Container>
      {/* section modal */}
      <ModalCreateScreen
        createScreen={createScreen}
        setCreateScreen={setCreateScreen}
        getScreen={getScreen}
      />
      <ModalUpdateScreen
        dataScreen={dataScreen}
        updateScreen={updateScreen}
        setUpdateScreen={setUpdateScreen}
        getScreen={getScreen}
      />
      <ModalDeleteScreen
        dataScreen={dataScreen}
        deleteScreen={deleteScreen}
        setDeleteScreen={setDeleteScreen}
        getScreen={getScreen}
      />
    </NavigationContainer>
  );
};

export default ScreenSetting;
