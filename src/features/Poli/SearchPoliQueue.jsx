import React, { useState } from "react";
import { InputSearch } from "../../components";
import { getPoliQueueAPI } from "../../services/poli";

const SearchPoliQueue = (props) => {
  const { setPoliQueue } = props;
  const [search, setSearch] = useState("");
  const getPoliQueue = async () => {
    // setLoading(true);
    try {
      const response = await getPoliQueueAPI(search);
      setPoliQueue(response.data);
    } catch (error) {
      throw error;
    } finally {
      // setLoading(false);
    }
  };
  const handleSearch = async () => {
    await getPoliQueue();
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
