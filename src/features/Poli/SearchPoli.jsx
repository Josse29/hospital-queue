import React, { useState } from "react";
import { InputSearch } from "../../components";
import { getPoliAPI } from "../../services/poli";

const SearchPoli = (props) => {
  const { setPoli, setLoading } = props;
  const [search, setSearch] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const response = await getPoliAPI(search);
      setPoli(response.data);
    } catch (error) {
      throw error;
    } finally {
      // setLoading(false);
    }
  };
  return (
    <>
      <InputSearch>
        <InputSearch.Input
          placeholder="Input Keyword Poli...."
          className="focus:outline-sky-600 w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputSearch.Btn
          type="button"
          className="bg-sky-500 hover:bg-sky-600 cursor-pointer"
          onClick={handleSearch}
        />
      </InputSearch>
    </>
  );
};

export default SearchPoli;
