import { createContext, useState } from "react";
import { io } from "socket.io-client";
export const AllContext = createContext();

export const AllProvider = ({ children }) => {
  const [logout, setLogout] = useState(false);
  const socket = io("http://localhost:8000");
  return (
    <AllContext.Provider value={{ logout, setLogout, socket }}>
      {children}
    </AllContext.Provider>
  );
};
