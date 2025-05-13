import React, { useState } from "react";
import { InputSearch } from "../../components";
import { getScreenAPI } from "../../services/screen";

const SearchScreen = (props) => {
  const { setScreen } = props;
  const [search, setSearch] = useState("");
  const handleSearch = async () => {
    try {
      const response = await getScreenAPI(search);
      setScreen(response.data);
    } catch (error) {
      throw error;
    }
  };
  return (
    <InputSearch>
      <InputSearch.Input
        className="focus:outline-sky-500 w-[400px]"
        placeholder="input keyword screen...."
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputSearch.Btn
        className="bg-sky-500 hover:bg-sky-600 hover:ring-sky-600 cursor-pointer"
        onClick={handleSearch}
      />
    </InputSearch>
  );
};

export default SearchScreen;
