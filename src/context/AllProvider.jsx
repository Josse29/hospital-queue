import { createContext, useState } from "react";
import { io } from "socket.io-client";
import { getPoliQueueAPI } from "../services/poli";

export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  // user || auth
  const [logout, setLogout] = useState(false);
  // socket
  const socket = io("http://localhost:8000");
  // poliqueue
  const [poliQueue, setPoliQueue] = useState([]);
  const getPoliQueue = async (req = "") => {
    try {
      const response = await getPoliQueueAPI(req);
      setPoliQueue(response.data);
    } catch (error) {
      throw error;
    }
  };
  // ring queue
  const [loadingRing, setLoadingRing] = useState(false);
  return (
    <AllContext.Provider
      value={{
        logout,
        setLogout,
        socket,
        poliQueue,
        setPoliQueue,
        getPoliQueue,
        loadingRing,
        setLoadingRing,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
