import React from "react";
import { InputSearch } from "../../components";

const SearchPoli = (props) => {
  const { className, ...rest } = props;
  return (
    <div>
      <InputSearch>
        <InputSearch.Input
          placeholder="Input Keyword Poli...."
          className={`focus:outline-sky-600 ${className}`}
        />
        <InputSearch.Btn className="bg-sky-500 hover:bg-sky-600" />
      </InputSearch>
    </div>
  );
};

export default SearchPoli;
