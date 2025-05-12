import { createContext, useState } from "react";

export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const [logout, setLogout] = useState(false);
  return (
    <AllContext.Provider value={{ logout, setLogout }}>
      {children}
    </AllContext.Provider>
  );
};
