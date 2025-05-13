import React from "react";
import { Button } from "../../components";
import { FaRotateRight } from "react-icons/fa6";
import { getScreenAPI } from "../../services/screen";

const BtnRefreshScreen = (props) => {
  const { setScreen } = props;
  const handleSearch = async () => {
    try {
      const response = await getScreenAPI();
      setScreen(response.data);
    } catch (error) {
      throw error;
    }
  };
  return (
    <Button
      title={<FaRotateRight />}
      className="bg-amber-600 hover:bg-amber-700 hover:ring-amber-700"
      onClick={handleSearch}
    />
  );
};

export default BtnRefreshScreen;
