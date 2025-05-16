import React, { useContext, useState } from "react";
import { InputSearch } from "../../components";
import { AllContext } from "../../context/AllProvider";

const SearchPoliQueue = () => {
  const { getPoliQueue } = useContext(AllContext);
  const [search, setSearch] = useState("");
  const handleSearch = async () => {
    await getPoliQueue(search);
  };
  return (
    <InputSearch>
      <InputSearch.Input
        placeholder="Input Keyword Poli...."
        className="focus:outline-sky-600 w-[400px]"
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputSearch.Btn
        className="bg-sky-500 hover:bg-sky-600 cursor-pointer"
        onClick={handleSearch}
      />
    </InputSearch>
  );
};

export default SearchPoliQueue;
