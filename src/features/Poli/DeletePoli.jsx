import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeletePoli = (props) => {
  const { data } = props;
  const [poliName, setPoliName] = useState("");
  useEffect(() => {
    setPoliName(data.PoliName);
  }, [data]);
  return (
    <div>
      <FaExclamationTriangle className="text-8xl mx-auto text-red-500 mb-3" />
      <div className="text-3xl text-center text-red-600 mb-4">
        Are You Sure Want to Delete {poliName} ?
      </div>
    </div>
  );
};

export default DeletePoli;
